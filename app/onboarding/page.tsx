"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function OnBoarding() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col gap-4 w-screen justify-center items-center font-semibold h-screen">
      <div className="text-2xl"> Onboarding Route</div>
      <Button onClick={() => signOut()} size={"lg"} className="cursor-pointer">
        Logout
      </Button>
      <pre>{JSON.stringify(session, null, 10)}</pre>
    </div>
  );
}
