"use client";
import { useStepper } from "../../hooks/use-stepper";
import Step1Form from "../step1-form";
import Step2Form from "../step2-form";
import Step3Form from "../step3-form";

const Form = () => {
  const { step } = useStepper();

  const renderStep = () => {
    switch (step) {
      case 2:
        return <Step1Form />;
      case 1:
        return <Step2Form />;
      case 3:
        return <Step3Form />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg- flex flex-col gap-2 shadow-md rounded-lg">
      <div className="flex items-center justify-center mb-6">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <div
              className={`h-1 w-20 md:w-44 mx-2 flex items-center justify-center rounded-full border-2 transition-all duration-300
                ${
                  step >= num
                    ? "bg-[#186ADE] text-white border-[#186ADE]"
                    : "bg-gray-200 text-gray-600 border-gray-400"
                }
              `}
            ></div>
          </div>
        ))}
      </div>

      {renderStep()}
    </div>
  );
};

export default Form;
