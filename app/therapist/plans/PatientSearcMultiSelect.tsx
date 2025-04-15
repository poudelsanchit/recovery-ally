import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";

type Patient = {
  id: string;
  name: string;
  email: string;
};

type Props = {
  value: Patient[];
  onChange: (patients: Patient[]) => void;
};
export default function PatientSearchMultiSelect({ value, onChange }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query.trim()) {
          setSearchResults([]);
          return;
        }

        setIsSearching(true);
        try {
          const response = await axios.get(
            `/api/v1/search/patient?name=${encodeURIComponent(query)}`
          );
          console.log(response.data.users);
          setSearchResults(
            response.data.users.map((user: any) => ({
              id: user._id, // Adjust if backend uses `_id`
              name: user.name,
              email: user.email,
            }))
          );
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsSearching(false);
        }
      }, 500),
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSelect = (patient: Patient) => {
    if (!value.find((p) => p.id === patient.id)) {
      onChange([...value, patient]);
    }
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleRemove = (id: string) => {
    onChange(value.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4 relative">
      <Input
        id="patient-search"
        placeholder="Search Patients..."
        value={searchTerm}
        onChange={handleInputChange}
        className="rounded-sm"
      />

      {/* Show search results */}
      {isSearching ? (
        <div className="py-4 text-center">Searching...</div>
      ) : searchResults.length > 0 ? (
        <div className="border rounded-sm divide-y absolute w-72 top-10 ">
          {searchResults.map((patient, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
            >
              <div onClick={() => handleSelect(patient)}>
                <p className="font-semibold text-sm">{patient.name}</p>
                <p className="text-sm text-gray-500">{patient.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : searchTerm ? (
        <div className="py-4 text-center text-gray-500">No patients found</div>
      ) : null}
    </div>
  );
}
