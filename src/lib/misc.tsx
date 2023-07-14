import { ThemeIcon } from "@mantine/core";
import {
  MdDeleteForever,
  MdCheckCircle,
  MdDangerous,
  MdPauseCircle,
  MdReportProblem,
  MdPending,
  MdPlayCircle,
} from "react-icons/md";

export const statusIcon = (status: string) => {
  switch (status) {
    case "blocked":
      return (
        <ThemeIcon color="yellow" variant="light" size={30}>
          <MdDeleteForever size="1.5rem" />
        </ThemeIcon>
      );

    case "cancelled":
      return (
        <ThemeIcon color="orange" variant="light" size={30}>
          <MdDangerous size="1.5rem" />
        </ThemeIcon>
      );

    case "done":
      return (
        <ThemeIcon color="green" variant="light" size={30}>
          <MdCheckCircle size="1.5rem" />
        </ThemeIcon>
      );

    case "fail":
      return (
        <ThemeIcon color="red" variant="light" size={30}>
          <MdReportProblem size="1.5rem" />
        </ThemeIcon>
      );

    case "paused":
      return (
        <ThemeIcon color="gray" variant="light" size={30}>
          <MdPauseCircle size="1.5rem" />
        </ThemeIcon>
      );

    case "pending":
      return (
        <ThemeIcon color="blue" variant="light" size={30}>
          <MdPending size="1.5rem" />
        </ThemeIcon>
      );

    case "todo":
      return (
        <ThemeIcon color="violet" variant="light" size={30}>
          <MdPlayCircle size="1.5rem" />
        </ThemeIcon>
      );
  }
};
