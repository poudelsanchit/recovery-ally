import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <>
        <Image
          src={session?.user?.image ?? "/avatars/shadcn.jpg"}
          alt={session?.user?.name ?? "/avatars/shadcn.jpg"}
          height={30}
          width={30}
          className="h-10 w-10 rounded-full"
        />
    </>
  );
}
