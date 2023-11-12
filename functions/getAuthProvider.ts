import { GoogleAuthProvider } from "firebase/auth";

const scopes : string[] = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/calendar',
]

export default function getAuthProvider() {
    const provider = new GoogleAuthProvider();

    for (let i = 0; i < scopes.length; i++) {
        provider.addScope(scopes[i]);
    }
    provider.addScope("https://www.googleapis.com/auth/calendar")
    return provider;
}