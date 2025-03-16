"use client";
import { createContext, useState, ReactNode } from "react";

type StepperContextType = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
};

export const StepperContext = createContext<StepperContextType | undefined>(
  undefined
);

export const StepperProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <StepperContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </StepperContext.Provider>
  );
};
