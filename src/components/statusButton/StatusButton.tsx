import { StatusMenu } from "@/components/statusMenu/StatusMenu";
import { TUseTest } from "@/lib/operators/types";
import { TStep } from "@/types/schema";

type StatusButtonProps = {
  step: TStep;
  updateStepStatuses: TUseTest["updateStepStatuses"];
};

export const StatusButton = ({
  step,
  updateStepStatuses,
}: StatusButtonProps) => (
  <StatusMenu
    step={step}
    id={step.id}
    updateStepStatuses={updateStepStatuses}
  />
);
