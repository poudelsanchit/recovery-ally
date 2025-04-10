"use client";
import { useSession } from "next-auth/react";
import LandingMain from "./landing/main";
import NavBar from "./landing/navbar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session && <pre>{JSON.stringify(session.user, null, 10)}</pre>}
      <NavBar />
      <LandingMain />
    </>
  );
}
