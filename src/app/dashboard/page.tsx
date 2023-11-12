"use client"

import getDb from "../../../functions/getDb";
import {useEffect, useState} from "react";
import {getAuth, getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import getFirebase from "../../../functions/getFirebase";
import {redirect} from "next/navigation";
import {setCookies} from "@/app/dashboard/setCookies";
import Link from "next/link";

let flag = false;

export default function Dashboard() {
    const firebase = getFirebase()
    const auth = getAuth(firebase)

    let [email, setEmail] = useState(localStorage.getItem('email'));

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    if(credential?.accessToken) {
                        localStorage.setItem("token", credential.accessToken)
                    }
                    const user = result.user;
                    if (user.email) {
                        localStorage.setItem('email', user.email);
                        setEmail(user.email);

                        setCookies();
                    }
                    console.log(user)
                }
            }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });

        if ((localStorage.getItem('redirect') != "true") && (!email) && (!flag)) {
            redirect('/login');
        }

        if (!flag) {
            flag = true
        }

        localStorage.setItem("redirect", "false")
    }, [])

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    return (
        <Link href={"/event"}>
            <button>New Calendar event</button>
        </Link>
    );
}