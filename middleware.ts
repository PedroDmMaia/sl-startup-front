import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const tokenFromCookie = cookieStore.get('jwt')?.value
  const tokenFromHeader = request.headers
    .get('Authorization')
    ?.replace('Bearer ', '')

  const token = tokenFromCookie || tokenFromHeader

  const isRootRoute = request.nextUrl.pathname === '/'

  // if (isRootRoute) {
  //   const response = NextResponse.next()
  //   response.cookies.delete('jwt')
  //   return response
  // }

  const isAuthRoute = request.nextUrl.pathname.includes('/dashboard')
  if (isAuthRoute && !token) {
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard', '/dashboard/:path*'],
}
