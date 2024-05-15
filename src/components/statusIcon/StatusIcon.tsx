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
import { StatusEnum } from "../../schema";
import { theme } from "../../theme";

interface IProps {
  status?: StatusEnum;
  size?: number;
  variant?: ThemeIconVariant;
  grayColor?: boolean;
}

export const StatusIcon = ({
  status,
  size = 24,
  variant = "transparent",
  grayColor = false,
}: IProps) => {
  const handleColor = (color?: DefaultMantineColor) => {
    if (grayColor) {
      return "gray";
    }

    return color;
  };

  switch (status) {
    case StatusEnum.BLOCKED:
      return (
        <ThemeIcon color={handleColor("yellow")} variant={variant} size={size}>
          <MdDeleteForever size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.CANCELLED:
      return (
        <ThemeIcon color={handleColor("orange")} variant={variant} size={size}>
          <MdDangerous size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.DONE:
      return (
        <ThemeIcon color={handleColor("green")} variant={variant} size={size}>
          <MdCheckCircle size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.FAIL:
      return (
        <ThemeIcon color={handleColor("red")} variant={variant} size={size}>
          <MdReportProblem size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.PAUSED:
      return (
        <ThemeIcon color={handleColor("gray")} variant={variant} size={size}>
          <MdPauseCircle size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.PENDING:
      return (
        <ThemeIcon color={handleColor("blue")} variant={variant} size={size}>
          <MdPending size="1.5rem" />
        </ThemeIcon>
      );

    case StatusEnum.TODO:
      return (
        <MdNotStarted
          size="1.5rem"
          color={handleColor(theme.colors?.secondary?.[8])}
        />
      );

    default:
      return (
        <MdPending
          size="1.5rem"
          color={handleColor(theme.colors?.primary?.[5])}
        />
      );
  }
};
