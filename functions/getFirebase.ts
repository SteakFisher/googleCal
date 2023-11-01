import { initializeApp } from "firebase/app";
import getFirebaseConfig from "./getFirebaseConfig";

type FireBaseConfig = {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
}

export default function getFirebase() {
    // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
    const firebaseConfig = getFirebaseConfig();

// Initialize Firebase
    return initializeApp(firebaseConfig);
}