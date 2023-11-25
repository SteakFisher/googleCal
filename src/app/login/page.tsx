import Image from "next/image";
import LoginButton from "@/app/login/LoginButton";


export default function Login() {
    return (
        <section className=" min-h-screen flex items-center justify-center bg-gray-200">

            <div className="flex bg-gray-100 ">

                <div className="px-12 py-4 rounded-2xl items-end justify-center text-center shadow-xl">

                    <p className=" font-serif text-gray-600 py-8">Sign in to calendar</p>
        
                    <p className=" flex justify-center pb-6 "><Image src={'/calendar.svg'} width={80} height={40} alt={"calendar_icon"} /></p>

                    <LoginButton />
                </div>

            </div>


       </section> 
    )
}

