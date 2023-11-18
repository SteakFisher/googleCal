import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const reqUrl = new URL(req.url)
    const code = reqUrl.searchParams.get('code');

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        try{
            await supabase.auth.exchangeCodeForSession(code)
        }
        catch (e) {
            console.log(e)
        }
    }
    console.log(reqUrl)
    return NextResponse.redirect(new URL('/dashboard', req.url));
}