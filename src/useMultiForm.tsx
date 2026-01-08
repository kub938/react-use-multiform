import { useState, Children, isValidElement, ReactNode } from "react";
import { MultiFormReturn, StepProps } from "./types";

export function useMultiForm<T>(names: T[]): MultiFormReturn<T> {
  const [nowStep, setNowStep] = useState<T>(names[0]);

  const handleStep = (type: "next" | "before") => {
    const nowIdx = names.findIndex((name) => name === nowStep);
    if (nowIdx < names.length - 1 && type === "next") {
      setNowStep(names[nowIdx + 1]);
    } else if (nowIdx > 0 && type === "before") {
      setNowStep(names[nowIdx - 1]);
    }
  };

  const Step = ({ children }: StepProps<T>) => <>{children}</>;

  const MultiForm = ({ children }: { children: ReactNode }) => {
    const names = Children.toArray(children).filter((child) =>
      isValidElement(child)
    );
    const targetName = names.find((child) => child.props.name === nowStep);

    if (!targetName) {
      console.warn("useMultiFrom의 인자 안에 해당하는 Step의 name이 없습니다");
    }
    return <>{targetName}</>;
  };

  const multiForm: MultiFormReturn<T> = {
    nowStep,
    handleStep,
    Step,
    MultiForm,
  };

  return multiForm;
}
