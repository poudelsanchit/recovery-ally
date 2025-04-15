"use client";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import PatientNavBar from "./navbar";

export default function LayoutPatient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 bg-[#0b0d0f] h-screen flex flex-col  gap-2">
      <PatientNavBar />

      {children}
    </div>
  );
}
