import {
  Box,
  Button,
  Flex,
  SegmentedControl,
  SegmentedControlItem,
  Text,
  Tooltip,
} from "@mantine/core";
import ArrowsUpdate from "../../assets/icons/arrows_update.svg";
import { StatusEnum } from "../../schema";
import { StatusIcon } from "../statusIcon/StatusIcon";

type StepSwitchProps = {
  currentStatus: StatusEnum;
  onChange: (status: StatusEnum) => void;
};

export const StepSwitch = ({ currentStatus, onChange }: StepSwitchProps) => {
  const data: SegmentedControlItem[] = Object.values(StatusEnum).map((s) => ({
    label: (
      <Tooltip label={s} title={s}>
        <StatusIcon
          status={s}
          color={s !== currentStatus ? "gray" : undefined}
        />
      </Tooltip>
    ),
    value: s,
  }));

  const resetStep = () => onChange(StatusEnum.PENDING);

  return (
    <Flex wrap="wrap" align="center" gap="sm">
      <Text fw="bold">Set state:</Text>

      <Box style={{ flex: 1 }}>
        <SegmentedControl
          data={data}
          value={currentStatus}
          onChange={(value) => onChange(value as StatusEnum)}
        />
      </Box>

      <Button
        variant="outline"
        onClick={resetStep}
        leftSection={<img src={ArrowsUpdate} />}
      >
        Reset step
      </Button>
    </Flex>
  );
};
