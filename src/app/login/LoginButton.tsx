'use client'

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function LoginButton() {
    const supabase = createClientComponentClient();

    return (
        <button className=" py-8" onClick={async (event) => {
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
        }}>
            <Image src={'/googleSignIn.svg'} width={181} height={40} alt={"Sign in with google"} />
        </button>
    )
}