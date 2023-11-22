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

            if(session && session.provider_token) {
                let primCal =  (await (await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary?access_token=${session.provider_token}`)).json())
                cookies().set('primaryCal', primCal.id);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    if (subscribe) {
        return NextResponse.redirect(new URL(`/subscribe/${subscribe}`, req.url));
    }

    return NextResponse.redirect(new URL('/dashboard', req.url));
}