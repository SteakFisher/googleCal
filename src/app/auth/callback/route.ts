import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const reqUrl = new URL(req.url)
    const code = reqUrl.searchParams.get('code');
    const subscribe = reqUrl.searchParams.get('subscribe');
    console.log(subscribe);

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        try{
            let {data : {session}} = await supabase.auth.exchangeCodeForSession(code);

            if(session && session.provider_refresh_token) {
                cookies().set('google_refresh_token', session.provider_refresh_token);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    if (subscribe) {
        return NextResponse.redirect(new URL(`/subscribe/${subscribe}`, process.env.NEXT_PUBLIC_VERCEL_URL));
    }

    return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_VERCEL_URL));
}