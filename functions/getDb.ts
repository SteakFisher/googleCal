import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import getFirebaseConfig from "./getFirebaseConfig";

export default function getDb() {
    const firebaseConfig = getFirebaseConfig();
    const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    return db;
}