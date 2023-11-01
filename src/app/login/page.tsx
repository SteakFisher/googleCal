"use client"

import Image from "next/image";
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider  } from "firebase/auth";
import getFirebase from "../../../functions/getFirebase";
import {useEffect} from "react";
import getDb from "../../../functions/getDb";


export default function Login() {
    const firebase = getFirebase()
    const auth = getAuth(firebase);
    const db = getDb();
    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    let token;
                    if(credential) {
                        token = credential.accessToken;
                    }
                    const user = result.user;
                    console.log(token, user)


                }
            }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }, [])


    return (
        <button onClick={(event) => {
            signInWithRedirect(auth, new GoogleAuthProvider());
        }}>
            <Image src={'/googleSignIn.svg'} width={181} height={40} alt={"Sign in with google"} />
        </button>
    )
}