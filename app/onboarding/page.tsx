"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react"; // ✅ `update` is a named export
import { Poppins } from "next/font/google";
import { useState } from "react";
import InitalStep from "./InitalStep";
import Step2 from "./patient/step2";
import Step2Patient from "./patient/step2";
import Step2Therapist from "./therapist/step2";

const poppins = Poppins({
  weight: ["400", "500", "500", "600", "700"],
  subsets: ["latin"],
});

export interface IOnboardingData {
  role?: string;
  specialization?: string;
  licenseNumber?: string;
  injury?: string;
}
export default function OnBoarding() {
  const [step, setStep] = useState(0);
  const [onboardingData, setOnBoardingData] = useState<
    Partial<IOnboardingData>
  >({});
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

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
            {step === 0 && (
              <InitalStep
                onboardingData={onboardingData}
                setOnBoardingData={setOnBoardingData}
                handleNextStep={handleNextStep}
              />
            )}

            {onboardingData.role === "patient" && step === 1 && (
              <Step2Patient
                onboardingData={onboardingData}
                setOnBoardingData={setOnBoardingData}
                handlePrevStep={handlePrevStep}
              />
            )}
            {onboardingData.role === "therapist" && step === 1 && (
              <Step2Therapist
                onboardingData={onboardingData}
                setOnBoardingData={setOnBoardingData}
                handlePrevStep={handlePrevStep}
              />
            )}
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
