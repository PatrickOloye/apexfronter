
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the token from the cookies
    // Note: The specific cookie name depends on your auth implementation.
    // Based on auth.service.ts, it sets 'apex_token' and 'refresh_token'.
    const token = request.cookies.get('apex_token')?.value || request.cookies.get('refresh_token')?.value;
    const isAuthenticatedFlag = request.cookies.get('is_authenticated')?.value;

    // Allow either server-issued tokens or the frontend auth flag
    // Frontend runs on a different domain, so backend cookies aren't visible here.
    const isAuthenticated = !!token || isAuthenticatedFlag === 'true';

    // Define routes that should be inaccessible when logged in
    const authRoutes = ['/signin', '/signup', '/forgot-password'];

    // Define protected routes that require login
    // Assuming all dashboard routes start with /dashboard, /admin, or /system-admin
    const protectedRoutes = ['/dashboard', '/admin', '/system-admin'];

    // Check if the current path is an auth route
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // CASE 1: User is logged in and tries to access auth pages (signin, signup)
    if (isAuthRoute && isAuthenticated) {
        // Redirect to a default dashboard. 
        // Ideally, we'd check the role from the token, but we can't easily decode it here without libraries.
        // For now, redirecting to /dashboard is a safe bet, and the client-side AuthGuard can reroute if needed.
        // Or we just let them go to the landing page if we are unsure.
        // Let's redirect to /dashboard as a general entry point.
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // CASE 2: User is NOT logged in and tries to access protected pages
    if (isProtectedRoute && !isAuthenticated) {
        const signInUrl = new URL('/signin', request.url);
        // Optionally append the return URL
        signInUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(signInUrl);
    }

    // Add no-store headers for auth routes to prevent BF Cache
    const response = NextResponse.next();
    if (isAuthRoute) {
        response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
    }

    return response;
}

// Config to limit the middleware scope for performance
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
