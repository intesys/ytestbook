import {
  DefaultMantineColor,
  ThemeIcon,
  ThemeIconVariant,
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
import { StatusEnum } from "../../schema";

interface IProps {
  status?: StatusEnum;
  size?: number;
  variant?: ThemeIconVariant;
  color?: DefaultMantineColor;
}

export const StatusIcon = ({
  status,
  size = 24,
  variant = "transparent",
  color,
}: IProps) => {
  const statusColor = color ?? getStatusColor(status);

  switch (status) {
    case StatusEnum.BLOCKED:
      return (
        <ThemeIcon color={statusColor} variant={variant} size={size}>
          <MdDeleteForever size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.CANCELLED:
      return (
        <ThemeIcon color={statusColor} variant={variant} size={size}>
          <MdDangerous size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.DONE:
      return (
        <ThemeIcon color={statusColor} variant={variant} size={size}>
          <MdCheckCircle size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.FAIL:
      return (
        <ThemeIcon color={statusColor} variant={variant} size={size}>
          <MdReportProblem size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.PAUSED:
      return (
        <ThemeIcon color={statusColor} variant={variant} size={size}>
          <MdPauseCircle size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.PENDING:
      return (
        <ThemeIcon color={statusColor} variant={variant} size={size}>
          <MdPending size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.TODO:
      return <MdNotStarted size="1.5rem" color={statusColor} />;

    default:
      return <MdPending size="1.5rem" color={statusColor} />;
  }
};
