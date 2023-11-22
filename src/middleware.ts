import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.includes(".") || req.nextUrl.pathname.startsWith('/auth/callback') || (req.nextUrl.pathname.startsWith('/subscribe'))) {
        return NextResponse.next();
    }

    let res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res });

    const { data: {session}} = await supabase.auth.getSession();

    console.log(session?.provider_token)
    if(session && session.provider_token && !req.cookies.get('primaryCal')?.value) {
        let primCal =  (await (await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary?access_token=${session.provider_token}`)).json())
        res.cookies.set('primaryCal', primCal.id)
    }

    if(!session && !req.nextUrl.pathname.startsWith('/login')) {
        res = NextResponse.redirect(new URL('/login', req.url));
    } else if(session && req.nextUrl.pathname.startsWith('/login')) {
        res = NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res
}

export const config = {
    matcher: [
        '/((?!_next).*)',
    ],
}