"use client"

import {useEffect, useState} from "react";
import {getAuth, getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import getFirebase from "../../../functions/getFirebase";
import {redirect} from "next/navigation";
import {setCookies} from "../../../functions/setCookies";
import Link from "next/link";

let flag = false;

export default async function Dashboard() {
    const firebase = getFirebase()
    const auth = getAuth(firebase)

    let [email, setEmail] = useState(localStorage.getItem('email'));
    let result = await getRedirectResult(auth)

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

    if ((localStorage.getItem('redirect') != "true") && (!email) && (!flag)) {
        redirect('/login');
    }

    if (!flag) {
        flag = true
    }

    localStorage.setItem("redirect", "false")
    return (
        <Link href={"/event"}>
            <button>New Calendar event</button>
        </Link>
    );
}