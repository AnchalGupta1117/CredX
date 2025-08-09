import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if the request is for the root path
  if (request.nextUrl.pathname === '/') {
    // Redirect to /predict-approval
    return NextResponse.redirect(new URL('/predict-approval', request.url))
  }
}

export const config = {
  matcher: '/'
}