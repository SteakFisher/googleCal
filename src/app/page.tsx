import Image from 'next/image'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Remindr.</h1>
      <h2>Simplifying punctuality</h2>
      <Link href={"/privacy"}>Privacy</Link>
      <Link href={"/tos"}>TOS</Link>
    </>
  )
}
