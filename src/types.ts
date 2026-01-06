import type { FC, ReactNode } from "react";

export interface StepProps {
  step?: number;
  children: React.ReactNode;
}

export interface MultiFormResponse {
  nowStep: number;
  handleStep: (type: "next" | "before") => void;
  Step: FC<StepProps>;
  MultiForm: FC<{ children: ReactNode }>;
}
