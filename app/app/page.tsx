"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function App() {
  
  return (
    <div className="flex flex-col gap-4 w-screen justify-center items-center font-semibold h-screen">
      <div className="text-2xl"> App Route</div>
      <Button onClick={() => signOut()} size={"lg"} className="cursor-pointer">
        Logout
      </Button>
    </div>
  );
}
