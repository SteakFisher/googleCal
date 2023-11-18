import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.includes(".") || req.nextUrl.pathname.startsWith('/auth/callback')) {
        return NextResponse.next();
    }

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res });

    const { data: {session}} = await supabase.auth.getSession();

    if(!session && !req.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', req.url));
    } else if(session && req.nextUrl.pathname.startsWith('/login')) {
        console.log(session);
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
}

export const config = {
    matcher: [
        '/((?!_next).*)',
    ],
}