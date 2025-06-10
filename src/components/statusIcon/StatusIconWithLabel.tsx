import { Group, GroupProps, Text, TextProps } from "@mantine/core";
import { getStatusLabel } from "../../lib/helpers/getStatusLabel.ts";
import { StatusEnum } from "../../types/schema.ts";
import classes from "./statusIcon.module.css";
import { StatusIcon, StatusIconProps } from "./StatusIcon.tsx";

interface StatusIconWithLabelProps extends GroupProps {
  status?: StatusEnum;
  statusIconProps?: Omit<StatusIconProps, "status">;
  labelProps?: TextProps;
}

export const StatusIconWithLabel = ({
  status = StatusEnum.PENDING,
  statusIconProps = {},
  labelProps = {},
  ...groupProps
}: StatusIconWithLabelProps) => (
  <Group
    className={classes.group}
    align="center"
    gap={6}
    wrap="nowrap"
    {...groupProps}
  >
    <StatusIcon status={status} {...statusIconProps} />
    <Text className={classes.label} {...labelProps}>
      {getStatusLabel(status)}
    </Text>
  </Group>
);
