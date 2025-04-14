"use client";

import { useState } from "react";
import { sportsInjuries, getUniqueBodyParts } from "./data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Injuries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const uniqueCategories = getUniqueBodyParts();

  const filteredInjuries = sportsInjuries.filter((injury) => {
    const matchesSearch = `${injury.name} ${injury.category}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || selectedCategory === ""
        ? true
        : injury.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 text-white">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search injuries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md text-black bg-white font-medium placeholder:font-medium rounded-sm"
        />

        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-full sm:w-60 bg-white text-black font-medium rounded-sm">
            <SelectValue placeholder="Filter by body part" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {uniqueCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredInjuries.length ? (
          filteredInjuries.map((data) => (
            <Card
              className="rounded-sm cursor-pointer hover:scale-[1.01] transition-all shadow-none"
              key={data.id}
            >
              <CardHeader>
                <CardTitle className="font-[510] text-sm">{data.name}</CardTitle>
                <CardDescription>{data.category}</CardDescription>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No injuries match your search or filter.
          </p>
        )}
      </div>
    </div>
  );
}
