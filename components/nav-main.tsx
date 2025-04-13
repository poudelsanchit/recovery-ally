"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const segment = useSelectedLayoutSegment();
  const current = segment ?? ""; // fallback for Dashboard
  const pathname = usePathname().split("/");
  const checkerPathname = pathname[2] ? pathname[2] : pathname[0];
  console.log(pathname);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const isActive = current === item.url; // matches Dashboard on ""
          return (
            <Link href={`/therapist/${item.url}`} key={index} prefetch>
              <SidebarMenuItem className=" flex justify-center items-center">
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "h-10 transition-colors duration-150 ease-in-out flex items-center gap-2 px-2 py-3 cursor-pointer hover:bg-[#eceaea] rounded-sm",
                    isActive
                      ? "bg-neutral-950/90 hover:bg-neutral-900 hover:text-white text-white"
                      : ""
                  )}
                >
                  {item.icon}
                  <span className="font-medium text-sm">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
