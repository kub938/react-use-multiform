import type { FC, ReactNode } from "react";
import { stepType } from "./__tests__/useMultiForm.render.test";

export interface StepProps {
  step: string;
  children: ReactNode;
}

export interface MultiFormResponse {
  nowStep: string;
  handleStep: (type: "next" | "before") => void;
  Step: ({ children }: StepProps) => JSX.Element;
  MultiForm: ({ children }: { children: ReactNode }) => JSX.Element;
}
