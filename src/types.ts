import type { FC, ReactNode } from "react";

export interface StepProps<T> {
  name: T;
  children: ReactNode;
}

export interface MultiFormReturn<T> {
  nowStep: T;
  handleStep: (type: "next" | "before") => void;
  Step: ({ children }: StepProps<T>) => JSX.Element;
  MultiForm: ({ children }: { children: ReactNode }) => JSX.Element;
}
