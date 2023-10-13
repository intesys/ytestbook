import { ThemeIcon, ThemeIconVariant } from "@mantine/core";
import {
  MdCheckCircle,
  MdDangerous,
  MdDeleteForever,
  MdNotStarted,
  MdPauseCircle,
  MdPending,
  MdReportProblem,
} from "react-icons/md";
import { theme } from "../../theme";
import { STATUS } from "../../types/status";

interface IProps {
  status?: STATUS | string;
  size?: number;
  variant?: ThemeIconVariant;
}

export const StatusIcon = ({
  status,
  size = 30,
  variant = "light",
}: IProps) => {
  switch (status) {
    case STATUS.BLOCKED:
      return (
        <ThemeIcon color="yellow" variant={variant} size={size}>
          <MdDeleteForever size="1.5rem" />
        </ThemeIcon>
      );

    case STATUS.CANCELLED:
      return (
        <ThemeIcon color="orange" variant={variant} size={size}>
          <MdDangerous size="1.5rem" />
        </ThemeIcon>
      );

    case STATUS.DONE:
      return (
        <ThemeIcon color="green" variant={variant} size={size}>
          <MdCheckCircle size="1.5rem" />
        </ThemeIcon>
      );

    case STATUS.FAIL:
      return (
        <ThemeIcon color="red" variant={variant} size={size}>
          <MdReportProblem size="1.5rem" />
        </ThemeIcon>
      );

    case STATUS.PAUSED:
      return (
        <ThemeIcon color="gray" variant={variant} size={size}>
          <MdPauseCircle size="1.5rem" />
        </ThemeIcon>
      );

    case STATUS.PENDING:
      return (
        <ThemeIcon color="blue" variant={variant} size={size}>
          <MdPending size="1.5rem" />
        </ThemeIcon>
      );

    case STATUS.TODO:
      return (
        <MdNotStarted size="1.5rem" color={theme.colors?.secondary?.[8]} />
      );

    default:
      return <MdPending size="1.5rem" color={theme.colors?.primary?.[5]} />;
  }
};
