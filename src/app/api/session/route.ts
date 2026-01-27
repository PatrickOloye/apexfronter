// src/app/api/session/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, SignJWT } from 'jose';

const secretKey = process.env.SESSION_SECRET_KEY;

// Make sure the secret key exists in production; use a development fallback otherwise
if (!secretKey && process.env.NODE_ENV === 'production') {
  console.error('Missing SESSION_SECRET_KEY environment variable');
}

const encodedKey = new TextEncoder().encode(secretKey || 'fallback-secret-key-for-development');

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { user } = body;

  if (!user) {
    return NextResponse.json({ message: "User data is required" }, { status: 400 });
  }

  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  // Set the cookie
  (await
    // Set the cookie
    cookies()).set({
    name: "Apex",
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ message: "Session created" });
}

export async function GET() {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("Apex")?.value;

  if (!sessionToken) {
    return NextResponse.json({ message: "No session found" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(sessionToken, encodedKey, { algorithms: ["HS256"] });
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ message: "Invalid session" }, { status: 401 });
  }
}

export async function DELETE() {
  (await cookies()).set({
    name: "Apex",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ message: "Session deleted" });
}