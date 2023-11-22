"use client"

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import {cookies} from "next/headers";

type Data =  {
    author: string,
    description: string | null,
    end_time: string | null,
    id: number,
    start_time: string | null,
    summary: string | null
}

export default function SubscribeEvent({data, signedIn, id, primaryCal}: {data?: Data, signedIn: boolean, id: string, primaryCal?: string}) {
    const supabase = createClientComponentClient();

    if (signedIn) {
        return (
            <button onClick={async (e) => {
                e.preventDefault()
                    // console.log(googleClientFetch())
                let res = (await (await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary?access_token=${primaryCal}`)).json())

            }}>Add to Google Calendar</button>
        )
    }
    else {
        return (
            <button className=" px-28 py-20" onClick={async (event) => {
                await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback?subscribe=${id}`,
                        scopes: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
                    }
                })
            }}>
                <Image src={'/googleSignIn.svg'} width={181} height={40} alt={"Sign in with google"} />
            </button>
        )
    }
}