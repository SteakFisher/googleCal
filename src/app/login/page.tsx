"use client"

import Image from "next/image";
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider  } from "firebase/auth";
import getFirebase from "../../../functions/getFirebase";
import {useEffect} from "react";


export default function Login() {
    const firebase = getFirebase()
    const auth = getAuth(firebase);

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
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
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
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