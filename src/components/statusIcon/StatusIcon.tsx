import {
  DefaultMantineColor,
  ThemeIcon,
  ThemeIconVariant,
  Tooltip,
} from "@mantine/core";
import { CSSProperties, useMemo } from "react";
import {
  MdCheckCircle,
  MdDangerous,
  MdDeleteForever,
  MdNotStarted,
  MdPauseCircle,
  MdPending,
  MdReportProblem,
} from "react-icons/md";
import { getStatusColor } from "../../lib/helpers/getStatusColor";
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
    if (hoverColor) {
      return {
        "--status-icon-hover-color": hoverColor, // passing the hoverColor through CSS variable since Mantine doesn't support '&:hover' in styles since 7.x
        ...style,
      };
    }

    return style;
  }, [hoverColor, style]);

  const statusIcon = useMemo(() => {
    switch (status) {
      case StatusEnum.BLOCKED:
        return <MdDeleteForever size="1.5rem" />;

      case StatusEnum.CANCELLED:
        return <MdDangerous size="1.5rem" />;

      case StatusEnum.DONE:
        return <MdCheckCircle size="1.5rem" />;

      case StatusEnum.FAIL:
        return <MdReportProblem size="1.5rem" />;

      case StatusEnum.PAUSED:
        return <MdPauseCircle size="1.5rem" />;

      default:
      case StatusEnum.PENDING:
        return <MdPending size="1.5rem" />;

      case StatusEnum.TODO:
        return <MdNotStarted size="1.5rem" />;
    }
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
