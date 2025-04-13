import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SectionCards() {
  return (
    <div className="  grid grid-cols-3 gap-4  ">
      <Card className="rounded-sm shadow-none">
        <CardHeader className="relative ">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            $1,250.00
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs  bg-green-400/20  text-green-700 font-semibold border"
            >
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
      </Card>
      <Card className="rounded-sm shadow-none">
        <CardHeader className="relative">
          <CardDescription>Total Patients</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            30
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs bg-red-400/20 border text-red-700 font-semibold"
            >
              <TrendingDownIcon className="size-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
      </Card>
      <Card className="rounded-sm shadow-none">
        <CardHeader className="relative">
          <CardDescription>Appointments</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            5
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs  bg-green-400/20 border text-green-700 font-semibold "
            >
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
