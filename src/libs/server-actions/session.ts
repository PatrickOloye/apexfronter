// session.ts - Place this in your libs/server-actions folder

import { cookies } from 'next/headers';
import { Session } from './types';

export async function createSession(session: Session): Promise<void> {
  // Store session data in cookies
  try {
    console.log("Setting cookies with session:", session);
    const cookieStore = await cookies();
    
    console.log("Setting user cookie:", JSON.stringify(session.user));
    cookieStore.set('user', JSON.stringify(session.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    
    console.log("Setting token cookie:", session.token);
    cookieStore.set('token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    
    console.log("Cookies set successfully");
  } catch (error) {
    console.error("Error in createSession:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  
  const userCookie = cookieStore.get('user');
  const tokenCookie = cookieStore.get('token');
  
  if (!userCookie || !tokenCookie) {
    return null;
  }
  
  try {
    const user = JSON.parse(userCookie.value);
    const token = tokenCookie.value;
    
    return { user, token };
  } catch (error) {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.delete('user');
  cookieStore.delete('token');
}

export async function updateTokens(token: string): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}