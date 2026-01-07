import { useState, Children, isValidElement, ReactNode } from "react";
import { MultiFormResponse, StepProps } from "./types";

export function useMultiForm(names: string[]): MultiFormResponse {
  const [nowStep, setNowStep] = useState(names[0]);

  const handleStep = (type: "next" | "before") => {
    const nowIdx = names.findIndex((name) => name === nowStep);
    if (nowIdx < names.length - 1 && type === "next") {
      setNowStep(names[nowIdx + 1]);
    } else if (nowIdx > 0 && type === "before") {
      setNowStep(names[nowIdx - 1]);
    }
  };

  const Step = ({ children }: StepProps) => <>{children}</>;

  const MultiForm = ({ children }: { children: ReactNode }) => {
    const names = Children.toArray(children).filter((child) =>
      isValidElement(child)
    );
    const targetName = names.find((child) => child.props.name === nowStep);

    return <>{targetName}</>;
  };

  const multiForm: MultiFormResponse = {
    nowStep,
    handleStep,
    Step,
    MultiForm,
  };

  return multiForm;
}
