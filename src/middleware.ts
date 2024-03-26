import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

import authConfig from '@/auth.config'
import { publicRoutes, authRoutes, authApiPrefix, DEFAULT_LOGIN_REDIRECT } from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isUserLoggedIn = !!req.auth
  const { nextUrl } = req

  const isAuthApiRoute = nextUrl.pathname.startsWith(authApiPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isAuthApiRoute) return NextResponse.next()

  if (isAuthRoute) {
    if (isUserLoggedIn) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))

    return NextResponse.next()
  }

  if (!isUserLoggedIn && !isPublicRoute) {
    let callbackURL = nextUrl.pathname

    if (nextUrl.search) callbackURL += nextUrl.search

    const encodedCallbackURL = encodeURIComponent(callbackURL)

    return NextResponse.redirect(new URL(
        `/auth/login?callbackUrl=${encodedCallbackURL}`,
        nextUrl
    ))
  }
})

// Se excluyen los archivos con extensión y los archivos de la carpeta _next de la ejecución del middleware.
export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    '/((?!.+\\.[\\w]+$|_next).*)',
    // Re-include any files in the api or trpc folders that might have an extension
    '/(api|trpc)(.*)'
  ]
}
// https://clerk.com/docs/quickstarts/nextjs
