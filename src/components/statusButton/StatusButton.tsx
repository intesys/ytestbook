import { TUseTest } from "../../lib/operators/types";
import { TStep } from "../../types/schema";
import { StatusMenu } from "../statusMenu/StatusMenu";

type StatusButtonProps = {
  step: TStep;
  updateStepStatuses: TUseTest["updateStepStatuses"];
};

export const StatusButton = ({
  step,
  updateStepStatuses,
}: StatusButtonProps) => {
  return (
    <StatusMenu
      step={step}
      id={step.id}
      updateStepStatuses={updateStepStatuses}
    />
  );
};
