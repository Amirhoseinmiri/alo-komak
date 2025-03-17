"use client";
import { createContext, useState, ReactNode } from "react";
import { UserType } from "../types";

type StepperContextType = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  idenData: UserType;
  setIdenData: React.Dispatch<React.SetStateAction<UserType>>;
  dataToken: string;
  setDataToken: React.Dispatch<React.SetStateAction<string>>;
};

export const StepperContext = createContext<StepperContextType | undefined>(
  undefined
);

export const StepperProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<number>(1);
  const [idenData, setIdenData] = useState<UserType>({
    email: "",
    mobile: "",
    password: "",
  });
  const [dataToken, setDataToken] = useState<string>("");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <StepperContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        idenData,
        setIdenData,
        dataToken,
        setDataToken,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
