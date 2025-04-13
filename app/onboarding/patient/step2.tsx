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
  injury: z.string().min(4, { message: "Must be more than 4 characters" }),
});
export default function Step2Patient({
  onboardingData,
  setOnBoardingData,
  handlePrevStep,
}: IStep2Interface) {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      injury: onboardingData?.injury,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setOnBoardingData((prevData) => {
        return {
          ...prevData,
          injury: values.injury,
        };
      });
      console.log(onboardingData?.role);
      const data = {
        role: onboardingData?.role,
        injury: values?.injury,
      };
      const response = await axios.post(
        `/api/v1/user/${session?.user?.userId}/onboarding`,
        data
      );
      if (response.data.status === 201) {
        await getSession();
        router.push("/patient");
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
            name="injury"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Label className="font-medium ">Injury</Label>
                <Input
                  {...field}
                  className="h-10 bg-white"
                  placeholder="eg: ACL tear, MCL tear"
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
