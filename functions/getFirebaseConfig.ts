type FireBaseConfig = {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
}

export default function getFirebaseConfig() {
    const firebaseConfig : FireBaseConfig = {
        apiKey: "AIzaSyA-wt4_ug6dfBLg8EGIuVz0cMva4t9P-a8",
        authDomain: "cal-d1a9b.firebaseapp.com",
        projectId: "cal-d1a9b",
        storageBucket: "cal-d1a9b.appspot.com",
        messagingSenderId: "829635324247",
        appId: "1:829635324247:web:d7434b8080dec301d43612"
    };
    return firebaseConfig;
}