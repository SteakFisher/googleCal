import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/dashboard') || (request.nextUrl.pathname.includes("."))) {
        return NextResponse.next()
    }
    console.log(cookies().get('loggedIn')?.value)
    if (cookies().get('loggedIn')?.value != 'true') {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/((?!_next).*)',
    ],
}