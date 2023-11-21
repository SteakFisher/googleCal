"use client"

import Image from "next/image";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";


export default function Login() {
    const supabase = createClientComponentClient();


    return (
        <section className=" min-h-screen flex items-center justify-center bg-gray-200">

            <div className="flex bg-gray-100 ">

                <div className="px-12 py-4 rounded-2xl items-end justify-center text-center shadow-xl">

                    <p className=" font-serif text-gray-600 py-8">Sign in to calendar</p>
        
                    <p className=" flex justify-center pb-6 "><Image src={'/calendar.svg'} width={80} height={40} alt={"calendar_icon"} /></p>

                    <button className=" py-8" onClick={async (event) => {
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


       </section> 
    )
}

