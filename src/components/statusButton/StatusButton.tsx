import { Box, Button, Text } from "@mantine/core";
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
          leftSection={
            <Box className="mantine-visible-from-md">
              <StatusIcon status={step.status} />
            </Box>
          }
          rightSection={
            <img
              className="mantine-visible-from-md"
              src={ArrowDropdown}
              height={24}
              width={24}
            />
          }
        >
          <Box className="mantine-hidden-from-md">
            <StatusIcon status={step.status} />
          </Box>

          <Text
            c={"black"}
            size="sm"
            fw={500}
            className="mantine-visible-from-md"
          >
            Change
          </Text>
        </Button>
      }
      updateStepStatus={updateStepStatus}
    />
  );
};
