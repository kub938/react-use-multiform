import { useState, Children, isValidElement, ReactNode, FC } from "react";
import { MultiFormResponse, StepProps } from "./types";

export const useMultiForm = (): MultiFormResponse => {
  const [nowStep, setNowStep] = useState(0);

  const handleStep = (type: "next" | "before") => {
    setNowStep((prev) => (type === "next" ? prev + 1 : Math.max(0, prev - 1)));
  };

  const Step = ({ children }: StepProps) => <>{children}</>;
  const MultiForm = ({ children }: { children: ReactNode }) => {
    const targetStep = Children.toArray(children).find(
      (child) => isValidElement(child) && child.props.step === nowStep
    );

    return <>{targetStep}</>;
  };

  const multiForm: MultiFormResponse = {
    nowStep,
    handleStep,
    Step,
    MultiForm,
  };
  return multiForm;
};
