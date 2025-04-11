"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSession, signOut, getSession } from "next-auth/react"; // ✅ `update` is a named export
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
import { Poppins } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  weight: ["400", "500", "500", "600", "700"],
});
const formSchema = z.object({
  role: z.string().min(1, {
    message: "Please select your role.",
  }),
});
export default function OnBoarding() {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        `/api/v1/user/${session?.user?.userId}/onboarding`,
        values
      );
      const data = response.data;
      // Force session refresh to get the updated isOnboarded value
      await getSession();
      if (values.role === "physio") {
        router.push("/physio");
      } else if (values.role === "patient") {
        router.push("patient");
      }

      // Then navigate
    } catch (error) {
      console.log(error);
    }
    console.log(session);
    console.log("hello");
  }
  return (
    <div
      className={`max-w-screen w-screen h-screen flex flex-col  items-center ${poppins.className}`}
    >
      <div className="h-max  w-full mt-20 flex justify-center items-center  ">
        <div className="flex flex-col gap-10 h-full justify-center items-center w-6/12">
          <div className="flex flex-col gap-2 w-full">
            <div className="font-semibold text-4xl">
              Welcome to Recovery Ally!
            </div>
            <div className="text-sm text-neutral-500 ">
              <div>We just need some basic info to get your profile setup.</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 ml-auto  border rounded-md h-max p-6 w-full bg-neutral-300/30">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <Label className="font-medium ">Role</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full placeholder:text-black font-medium cursor-pointer bg-neutral-50">
                            <SelectValue placeholder="Select your Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-semibold">
                          <SelectItem
                            value="patient"
                            className="cursor-pointer"
                          >
                            Patient
                          </SelectItem>
                          <SelectItem value="physio" className="cursor-pointer">
                            Physio Therapist
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="rounded-sm flex gap-1 font-medium  cursor-pointer w-28 ml-auto"
                  size={"lg"}
                >
                  <div>Finish</div>
                  <ArrowRight />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Button
        onClick={() => signOut()}
        variant={"outline"}
        className="cursor-pointer absolute right-10 bottom-10 px-4 py-2 font-semibold"
      >
        Logout
      </Button>
    </div>
  );
}
