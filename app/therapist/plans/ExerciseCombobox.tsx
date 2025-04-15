// components/ExerciseCombobox.tsx
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import { Check, ChevronDown } from "lucide-react";
  import { cn } from "@/lib/utils";
  import React from "react";
  
  interface ExerciseOption {
    id: string;
    name: string;
  }
  
  interface ExerciseComboboxProps {
    options: ExerciseOption[];
    value: string | undefined;
    onChange: (value: string) => void;
    placeholder?: string;
  }
  
  export  default function ExerciseCombobox({
    options,
    value,
    onChange,
    placeholder = "Select Exercise",
  }: ExerciseComboboxProps) {
    const [open, setOpen] = React.useState(false);
  
    const selectedLabel = options.find((e) => e.id === value)?.name ?? "";
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-[200px] justify-between border px-3 py-2 rounded text-sm text-left font-medium",
              !value && "text-muted-foreground"
            )}
          >
            {selectedLabel || placeholder}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50 inline-block" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search exercise..." />
            <CommandEmpty>No exercise found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                  className="font-medium"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
  