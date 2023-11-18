"use client"

import Image from "next/image";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";


export default function Login() {
    const supabase = createClientComponentClient();


    return (
        <div className={"px-11 py-48 bg-violet-950"}>
        <div className="flex items-center">
        <Image src={'/illustration-planning (1).svg'} width={550} height={100} alt={"Sign in icon"} />
        
       
        <div className={"w-96 px- 24 shadow-lm bg-gradient-to-tr from-violet-700 to-indigo-900 rounded-md"}>
        
        <h1 className="px-24 py-20 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to to-zinc-400">SIGN IN</h1>
        <p className="px-36"><Image src={'/user-profile (1).svg'} width={100} height={10} alt={"Sign in icon"} /></p>
       
        <div className={"flex justify-items-end w-96 px- 24 shadow-lm bg-gradient-to-bl from-violet-700 to-indigo-900"}>
        
        <button className=" px-28 py-20" onClick={async (event) => {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`,
                    scopes: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
                }
            })
        }}>
            <Image src={'/googleSignIn.svg'} width={181} height={40} alt={"Sign in with google"} />
        </button>
        </div>
        </div>
        </div>
        </div>
        
    )
}


//<div className={"flex justify-center py-80 items-center"}>