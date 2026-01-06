import type { FC, ReactNode } from "react";

export interface StepProps {
  step: number;
  children: ReactNode;
}

export interface MultiFormResponse {
  nowStep: number;
  handleStep: (type: "next" | "before") => void;
  Step: ({ children }: StepProps) => JSX.Element;
  MultiForm: ({ children }: { children: ReactNode }) => JSX.Element;
}
