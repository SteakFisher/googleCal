"use client"

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import {DateTime} from "luxon";
import {Session} from "@supabase/supabase-js";

type Data =  {
    author: string,
    description: string | null,
    end_time: string | null,
    id: number,
    start_time: string | null,
    summary: string | null
}

export default function SubscribeEvent({data, signedIn, id, session}: {
    data?: Data,
    signedIn: boolean,
    id: string,
    session?: Session
}) {
    const supabase = createClientComponentClient();

    if (signedIn && data) {
        return (
            <button onClick={async (e) => {
                e.preventDefault()
                console.log(session);
                let startTime = DateTime.fromISO(data.start_time as string).toSQL() as string;
                let startSplit = startTime?.split(' ')

                let endTime = DateTime.fromISO(data.end_time as string).toSQL() as string;
                let endSplit = endTime?.split(' ')


                let res = (await (await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=${session?.provider_token}`, {
                    method: "POST",
                    body: JSON.stringify({
                        'summary': data.summary,
                        // 'description': data.description ? data.description : null,
                        'start': {
                            'dateTime': `${startSplit[0]}T${startSplit[1]}${startSplit[2]}`,
                        },
                        'end': {
                            'dateTime': `${endSplit[0]}T${endSplit[1]}${endSplit[2]}`,
                        }
                    })
                })).json())
                console.log(res)
            }}>Add to Google Calendar</button>
        )
    } else {
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
                <Image src={'/googleSignIn.svg'} width={181} height={40} alt={"Sign in with google"}/>
            </button>
        )
    }
}