import {
  DefaultMantineColor,
  ThemeIcon,
  ThemeIconVariant,
  Tooltip,
} from "@mantine/core";
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
import { StatusEnum } from "../../types/schema";
import { getStatusLabel } from "../../lib/helpers/getStatusLabel";
import { useMemo } from "react";

interface IProps {
  status?: StatusEnum;
  size?: number;
  variant?: ThemeIconVariant;
  color?: DefaultMantineColor;
  showTooltip?: boolean;
}

export const StatusIcon = ({
  status,
  size = 24,
  variant = "transparent",
  color,
  showTooltip = true,
}: IProps) => {
  const statusColor = color ?? getStatusColor(status);
  const tooltip = getStatusLabel(status);

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
  }, [status, statusColor]);

  const themeIcon = (
    <ThemeIcon color={statusColor} variant={variant} size={size}>
      {statusIcon}
    </ThemeIcon>
  );

  if (showTooltip) {
    return <Tooltip label={tooltip}>{themeIcon}</Tooltip>;
  }

  return themeIcon;
};
