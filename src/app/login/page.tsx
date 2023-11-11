"use client"

import Image from "next/image";
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider  } from "firebase/auth";
import getFirebase from "../../../functions/getFirebase";
import {redirect} from "next/navigation";
import {useEffect} from "react";


export default function Login() {
    const firebase = getFirebase()
    const auth = getAuth(firebase)

    useEffect(() => {
        if (localStorage.getItem("redirect") == "true") redirect('/dashboard')
    }, []);

    return (
        <button onClick={(event) => {
            localStorage.setItem("redirect", "true");
            signInWithRedirect(auth, new GoogleAuthProvider());
        }}>
            <Image src={'/googleSignIn.svg'} width={181} height={40} alt={"Sign in with google"} />
        </button>
    )
}