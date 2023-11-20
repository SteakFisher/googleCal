"use client"

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function SubscribeEvent({signedIn, id}: {signedIn: boolean, id: string}) {
    const supabase = createClientComponentClient();

    if (signedIn) {
        return (
            <button onClick={(e) => {
                console.log("Set it up")
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