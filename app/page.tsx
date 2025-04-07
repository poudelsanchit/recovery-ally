import Image from "next/image";
import { Header } from "./header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="h-screen w-full"></main>
      <footer className="h-screen"></footer>
    </>
  );
}
