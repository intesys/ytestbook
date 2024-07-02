import { TStep } from "../../types/schema";

export const getPreviousStep = (stepId: string, steps: TStep[]) => {
  const stepIndex = steps.findIndex((s) => s.id === stepId);

  if (stepIndex <= 0) {
    return undefined;
  }

  return steps[stepIndex - 1];
};

export const getNextStep = (stepId: string, steps: TStep[]) => {
  const stepIndex = steps.findIndex((s) => s.id === stepId);

  if (stepIndex >= steps.length) {
    return undefined;
  }

  return steps[stepIndex + 1];
};
