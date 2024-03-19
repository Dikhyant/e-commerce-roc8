import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { pageRoutes } from './constants/page-routes'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log("path", path);

  const isPublicPath = path === '/' || path === `/${pageRoutes.login}` || path === `/${pageRoutes.signup}` || path === `/${pageRoutes.verifyEmail}`

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL(`/${pageRoutes.markInterests}`, request.nextUrl));
  }

  if(isPublicPath && !token) {
    return NextResponse.redirect(new URL(`/${pageRoutes.login}`, request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL(`/${pageRoutes.login}`, request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: `/((?!login|api|_next/static|_next/image|favicon.ico).*)`,
}