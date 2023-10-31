// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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
    const firebaseConfig : FireBaseConfig = {
        apiKey: "AIzaSyA-wt4_ug6dfBLg8EGIuVz0cMva4t9P-a8",
        authDomain: "cal-d1a9b.firebaseapp.com",
        projectId: "cal-d1a9b",
        storageBucket: "cal-d1a9b.appspot.com",
        messagingSenderId: "829635324247",
        appId: "1:829635324247:web:d7434b8080dec301d43612"
    };

// Initialize Firebase
    return initializeApp(firebaseConfig);
}