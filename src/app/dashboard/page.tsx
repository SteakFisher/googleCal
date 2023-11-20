import Link from "next/link";

let flag = false;

export default function Dashboard() {
    return (
        <Link href={"/event"}>
            <button>New Calendar event</button>
        </Link>
    );
}