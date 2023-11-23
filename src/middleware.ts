import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {BodyInit} from "undici-types";

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.includes(".") || req.nextUrl.pathname.startsWith('/auth/callback') || (req.nextUrl.pathname.startsWith('/subscribe'))) {
        return NextResponse.next();
    }

    let res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res });

    const { data: {session}} = await supabase.auth.getSession();

    if (!session?.provider_token) {
        let refToken = cookies().get("refresh_token")?.value;

        if (refToken && session) {
            let { access_token } = await (await fetch("https://www.googleapis.com/oauth2/v4/token", {
                method: "POST",
                body: JSON.stringify({
                    "client_id": process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    refresh_token: refToken,
                    grant_type: "refresh_token"
                })
            })).json()
            session.provider_token = access_token
            await supabase.auth.setSession(session)
        }
        else {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    },
                    redirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`,
                    scopes: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
                }
            })
        }
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