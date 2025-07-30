import type { NextRequest } from 'next/server';
import { isAuthenticated } from './lib/auth';

export function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return Response.json({ message: 'Authentication failed' }, { status: 401 });
  }
}

export const config = {
  matcher: '/api/:path*',
};
