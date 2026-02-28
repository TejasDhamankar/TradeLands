import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url));
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    path: '/',
    maxAge: 0,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
