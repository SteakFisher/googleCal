import Link from "next/link";
import {Head} from "next/document";

export default function Home() {
  return (
      <div>
          <h1>Remindr.</h1>
          <h2>Simplifying punctuality</h2>
          <Link href={"/privacy"}>Privacy</Link>
          <Link href={"/tos"}>TOS</Link>
      </div>
  )
}
