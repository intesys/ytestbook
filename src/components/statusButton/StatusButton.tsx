import { Button, Text } from "@mantine/core";
import ArrowDropdown from "../../assets/icons/arrow_drop_down.svg";
import { TUseTest } from "../../lib/operators/types";
import { TStep } from "../../schema";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { StatusMenu } from "../statusMenu/StatusMenu";
import { getStatusColor } from "../../lib/helpers/getStatusColor";

type StatusButtonProps = {
  step: TStep;
  updateStepStatus: TUseTest["updateStepStatus"];
};

export const StatusButton = ({ step, updateStepStatus }: StatusButtonProps) => {
  const statusColor = getStatusColor(step.status);

  return (
    <StatusMenu
      id={step.id}
      target={
        <Button
          variant="light"
          color={statusColor}
          h={45}
          leftSection={<StatusIcon status={step.status} />}
          rightSection={<img src={ArrowDropdown} height={24} width={24} />}
        >
          <Text c={"black"} size="sm" fw={500}>
            Change
          </Text>
        </Button>
      }
      updateStepStatus={updateStepStatus}
    />
  );
};
