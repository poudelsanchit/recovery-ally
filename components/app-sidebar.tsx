"use client";

import * as React from "react";
import {
  Book,
  CalendarCheck2,
  CalendarRange,
  LayoutDashboard,
  Map,
  PersonStanding,
  PieChart,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "",
      icon: <LayoutDashboard className="w-10 h-10 " />,
      isActive: true,
    },
    {
      title: "Patients",
      url: "patients",
      icon: <Users className="w-5 h-5 shrink-0" />,
    },
    {
      title: "Injuries",
      url: "injuries",
      icon: <PersonStanding className="w-5 h-5 shrink-0" />,
    },
    {
      title: "Plans",
      url: "plans",
      icon: <Book className="w-5 h-5 shrink-0" />,
    },
    {
      title: "Appointments",
      url: "appointments",
      icon: <CalendarCheck2 className="w-5 h-5 shrink-0" />,
    },
    {
      title: "Schedules",
      url: "schedules",
      icon: <CalendarRange className="w-5 h-5 shrink-0" />,
    },
  ],

  projects: [
    {
      name: "Help Center",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Settings",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
