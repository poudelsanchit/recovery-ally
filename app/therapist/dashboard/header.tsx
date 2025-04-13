import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {  useSession } from "next-auth/react";
export default function DashboardHeader() {
  const {data:session} = useSession();
  return (
    <div className=" w-full h-full rounded-sm pt-4 pl-4 pb-6 bg-purple-600 text-white shadow font-semibold flex">
      <div className="flex flex-col justify-between ">
        <div className="flex flex-col">
          <div className="text-xl">Good Morning, Dr {session?.user?.name}</div>
          <div className="text-sm font-medium text-neutral-300">
            Have great and productive day
          </div>
        </div>
        <div className="text-sm ">
          <Button
            variant={"secondary"}
            size={"lg"}
            className="cursor-pointer rounded-sm font-semibold"
          >
            Appointments <ArrowRight />
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
