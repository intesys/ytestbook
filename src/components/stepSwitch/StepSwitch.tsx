import {
  Box,
  Button,
  Flex,
  Image,
  SegmentedControl,
  SegmentedControlItem,
  Text,
} from "@mantine/core";
import ArrowsUpdate from "../../assets/icons/arrows_update.svg";
import { StatusEnum } from "../../types/schema";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { getStatusColor } from "../../lib/helpers/getStatusColor";

type StepSwitchProps = {
  currentStatus: StatusEnum;
  onChange: (status: StatusEnum) => void;
};

export const StepSwitch = ({ currentStatus, onChange }: StepSwitchProps) => {
  const data: SegmentedControlItem[] = Object.values(StatusEnum).map((s) => ({
    label: (
      <StatusIcon
        status={s}
        color={s !== currentStatus ? "gray" : undefined}
        hoverColor={`${getStatusColor(s)}`}
        style={{
          height: 34,
          width: 44,
        }}
      />
    ),
    value: s,
  }));

  const resetStep = () => onChange(StatusEnum.PENDING);

  return (
    <Flex wrap="wrap" align="center" gap="sm">
      <Text span fw="bold">
        Set state:
      </Text>

      <Box style={{ flex: 1 }}>
        <SegmentedControl
          data={data}
          value={currentStatus}
          onChange={(value) => onChange(value as StatusEnum)}
          styles={{
            label: {
              padding: 0,
            },
            innerLabel: {
              padding: 0,
            },
          }}
        />
      </Box>

      <Button
        variant="outline"
        onClick={resetStep}
        leftSection={<Image alt="Reset step" src={ArrowsUpdate} />}
      >
        Reset step
      </Button>
    </Flex>
  );
};
