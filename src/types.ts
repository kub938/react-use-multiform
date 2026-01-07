import type { FC, ReactNode } from "react";

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface MultiFormResponse {
  nowStep: string;
  handleStep: (type: "next" | "before") => void;
  Step: ({ children }: StepProps) => JSX.Element;
  MultiForm: ({ children }: { children: ReactNode }) => JSX.Element;
}
