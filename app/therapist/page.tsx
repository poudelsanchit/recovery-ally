"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Poppins } from "next/font/google";
import DashboardHeader from "./dashboard/header";
import CalendarComponent from "./dashboard/calendar-component";
import SectionCards from "./dashboard/stats-card";
import { DashboardTable } from "./dashboard/dashboard-table";
const poppins = Poppins({
  weight: ["400", "500", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Physio() {
  return (
    <div className="flex flex-col  h-full w-full gap-4 p-4">
      <div className="h-12/6 w-full flex gap-4 ">
        <div className="flex flex-col gap-4 h-full w-12/4">
          <div className="h-full w-full ">
            <DashboardHeader />
          </div>
          <SectionCards />
        </div>
        <div className="w-max h-full flex justify-center items-center ">
          <CalendarComponent />
        </div>
      </div>
      <div className="h-12/5 w-full  bg-white p-2 rounded-sm  ">
        <div className="text-xl font-semibold"> Your Appointments</div>
        <DashboardTable />
      </div>
    </div>
  );
}
