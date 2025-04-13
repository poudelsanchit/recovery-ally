"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { IOnboardingData } from "./page";
interface OnboardingStepOneProps {
  onboardingData?: IOnboardingData;
  setOnBoardingData: (
    updater: (prevData: IOnboardingData) => IOnboardingData
  ) => void;
  handleNextStep: () => void;
}
const formSchema = z.object({
  role: z.string().min(1, {
    message: "Please select your role.",
  }),
});
export default function InitalStep({
  onboardingData,
  setOnBoardingData,
  handleNextStep,
}: OnboardingStepOneProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: onboardingData?.role,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(onboardingData);
      setOnBoardingData((prevData) => {
        return {
          ...prevData, // Keep any existing data
          role: values.role,
        };
      });
      handleNextStep();
      // Then navigate
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <Label className="font-medium ">Role</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full placeholder:text-black font-medium cursor-pointer bg-neutral-50">
                    <SelectValue placeholder="Select your Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="font-semibold">
                  <SelectItem value="patient" className="cursor-pointer">
                    Patient
                  </SelectItem>
                  <SelectItem value="therapist" className="cursor-pointer">
                    Physiotherapist
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="rounded-sm flex gap-1 font-medium  cursor-pointer w-32 ml-auto "
          size={"lg"}
        >
          <div>Next Step</div>
          <ArrowRight />
        </Button>
      </form>
    </Form>
  );
}
