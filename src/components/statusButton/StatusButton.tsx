import { Box, Button, Image, Text } from "@mantine/core";
import ArrowDropdown from "../../assets/icons/arrow_drop_down.svg";
import { getStatusColor } from "../../lib/helpers/getStatusColor";
import { TUseTest } from "../../lib/operators/types";
import { TStep } from "../../types/schema";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { StatusMenu } from "../statusMenu/StatusMenu";

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
          leftSection={
            <Box visibleFrom="md">
              <StatusIcon status={step.status} />
            </Box>
          }
          rightSection={
            <Box display="inline" visibleFrom="md">
              <Image alt="Change" src={ArrowDropdown} height={24} width={24} />
            </Box>
          }
        >
          <Box hiddenFrom="md">
            <StatusIcon status={step.status} />
          </Box>

          <Text c={"black"} size="sm" fw={500} visibleFrom="md">
            Change
          </Text>
        </Button>
      }
      updateStepStatus={updateStepStatus}
    />
  );
};
