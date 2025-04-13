"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { debounce } from "lodash";
import { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function AddPatient() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Memoize the debounced search function
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
          setSearchResults(response.data.users);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsSearching(false);
        }
      }, 1000), // 1 second debounce
    []
  );

  // Handle input change with debounce
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  const handleAddPatient = async (id: string) => {
    try {
      const response = await axios.post(
        `/api/v1/user/${session?.user?.userId}/therapist/patients`,
        {
          patientId: id,
        }
      );
      const data = response.data;
      console.log(data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-sm cursor-pointer font-medium px-6">
          Add Patient <Plus size={16} className="ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription>
            Search patient by name, email, or username
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="patient-search">Search</Label>
            <Input
              id="patient-search"
              placeholder="Start typing..."
              value={searchTerm}
              onChange={handleInputChange}
              className="rounded-sm"
            />
          </div>

          {isSearching ? (
            <div className="py-4 text-center">Searching...</div>
          ) : searchResults.length > 0 ? (
            <div className="border rounded-sm divide-y">
              {searchResults.map((patient) => (
                <div
                  key={patient.id}
                  className="p-3 hover:bg-gray-50 hover:rounded-sm  cursor-pointer flex items-center justify-between"
                >
                  <div className="flex gap-2 ">
                    <Image
                      src={patient.image}
                      width={20}
                      height={20}
                      alt="Profile Image"
                      className="h-9 w-9 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-base">{patient.name}</p>
                      <p className="text-sm font-medium text-gray-500">
                        {patient.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className=" rounded-sm px-8 cursor-pointer"
                    onClick={() => handleAddPatient(patient._id)}
                  >
                    Add Patient <Plus />
                  </Button>
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="py-4 text-center text-gray-500">
              No patients found
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
