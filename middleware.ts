import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const isProtected =
    url.pathname.startsWith('/tasks/new') ||
    /\/tasks\/[\w-]+\/edit$/.test(url.pathname);
  if (!isProtected) return NextResponse.next();

  // Check for Supabase session cookies set by supabase-js
  const accessToken = request.cookies.get('sb-access-token')?.value;
  const refreshToken = request.cookies.get('sb-refresh-token')?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/tasks/new', '/tasks/:taskId/edit'],
};
