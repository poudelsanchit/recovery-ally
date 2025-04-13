import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Router } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IOnboardingData } from "../page";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IStep2Interface {
  onboardingData?: IOnboardingData;
  setOnBoardingData: (
    updater: (prevData: IOnboardingData) => IOnboardingData
  ) => void;
  handlePrevStep: () => void;
}
const formSchema = z.object({
  specialization: z
    .string()
    .min(4, { message: "Must be more than 4 characters" }),
  licenseNumber: z
    .string()
    .min(4, { message: "Must be more than 4 characters" }),
});
export default function Step2Therapist({
  onboardingData,
  setOnBoardingData,
  handlePrevStep,
}: IStep2Interface) {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialization: onboardingData?.specialization,
      licenseNumber: onboardingData?.licenseNumber,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setOnBoardingData((prevData) => {
        return {
          ...prevData,
          specialization: values.specialization,
          licenseNumber: values.licenseNumber,
        };
      });
      console.log(onboardingData?.role);
      const data = {
        role: onboardingData?.role,
        specialization: values?.specialization,
        licenseNumber: values?.licenseNumber,
      };
      const response = await axios.post(
        `/api/v1/user/${session?.user?.userId}/onboarding`,
        data
      );
      if (response.data.status === 201) {
        await getSession();
        router.push("/therapist");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Label className="font-medium ">Specialization</Label>
                <Input
                  {...field}
                  className="h-10 bg-white"
                  placeholder="eg: Orthopedic Physiotherapist, Arthritis Physiotherapist"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Label className="font-medium ">licenseNumber</Label>
                <Input
                  {...field}
                  className="h-10 bg-white"
                  placeholder="eg: PSY-12345"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 ml-auto">
            <Button
              type="button"
              onClick={handlePrevStep}
              variant={"outline"}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <Button type="submit" className="cursor-pointer">
              Submit <ArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
