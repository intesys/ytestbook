import {
  DefaultMantineColor,
  ThemeIcon,
  ThemeIconVariant,
  Tooltip,
} from "@mantine/core";
import { CSSProperties, useMemo } from "react";
import { getStatusColor } from "../../lib/helpers/getStatusColor";
import { getStatusIcon } from "../../lib/helpers/getStatusIcon.ts";
import { getStatusLabel } from "../../lib/helpers/getStatusLabel";
import { StatusEnum } from "../../types/schema";
import classes from "./statusIcon.module.css";

export interface StatusIconProps {
  status?: StatusEnum;
  size?: number;
  variant?: ThemeIconVariant;
  color?: DefaultMantineColor;
  hoverColor?: DefaultMantineColor;
  showTooltip?: boolean;
  style?: CSSProperties;
}

export const StatusIcon = ({
  status,
  size = 24,
  variant = "transparent",
  color,
  showTooltip = true,
  hoverColor,
  style,
}: StatusIconProps) => {
  const statusColor = color ?? getStatusColor(status);
  const tooltip = getStatusLabel(status);

  const styles = useMemo(() => {
    return {
      "--status-icon-hover-color": hoverColor ?? statusColor, // passing the hoverColor through CSS variable since Mantine doesn't support '&:hover' in styles since 7.x
      ...style,
    };
  }, [hoverColor, statusColor, style]);

  const statusIcon = useMemo(() => {
    const Icon = getStatusIcon(status);
    return <Icon size="1.5rem" />;
  }, [status]);

  const themeIcon = (
    <ThemeIcon
      className={classes.statusIcon}
      color={statusColor}
      variant={variant}
      size={size}
      styles={{
        root: styles,
      }}
    >
      {statusIcon}
    </ThemeIcon>
  );

  if (showTooltip) {
    return <Tooltip label={tooltip}>{themeIcon}</Tooltip>;
  }

  return themeIcon;
};
