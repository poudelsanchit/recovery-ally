import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "./Profile";

export default function PatientNavBar() {
  const pathname = usePathname();
  const navMenu = [
    {
      title: "Home",
      route: "/patient",
    },
    {
      title: "Plans",
      route: "/patient/plans",
    },
    {
      title: "Workout",
      route: "/patient/workout",
    },
    {
      title: "Progress",
      route: "/patient/progress",
    },
  ];
  return (
    <header className="flex bg-[#17191b] text-white w-full  p-4 justify-between items-center rounded-2xl font-semibold">
      <div className="flex justify-center items-center gap-2">
        Recovery Ally
      </div>
      <div className="flex justify-center items-center gap-4">
        {navMenu.map((data) => {
          return (
            <Link href={data.route} key={data.route}>
              <Button
                className={cn(
                  "font-semibold cursor-pointer px-6",
                  data.route === pathname ? "bg-blue-600 hover:bg-blue-600" : "bg-none"
                )}
              >
                {data.title}
              </Button>
            </Link>
          );
        })}
      </div>
      <Profile />
    </header>
  );
}
