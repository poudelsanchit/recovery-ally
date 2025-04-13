"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="h-full w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-sm border  font-semibold bg-white h-full w-full"
      />
    </div>
  );
}