'use client'

import Link from "next/link";
import {useEffect} from "react";
import {redirect} from "next/navigation";

let flag = false;

export default function Dashboard() {
    console.log('ye')
    useEffect(() => {
        redirect('/event')
    }, []);
    return (
        <Link href={"/event"}>
            <button>New Calendar event</button>
        </Link>
    );
}