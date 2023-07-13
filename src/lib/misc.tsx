import { ThemeIcon } from "@mantine/core";
import StatusBlocked from "../assets/icons/status_blocked.svg";
import StatusCancelled from "../assets/icons/status_cancelled.svg";
import StatusDone from "../assets/icons/status_done.svg";
import StatusFail from "../assets/icons/status_fail.svg";
import StatusPaused from "../assets/icons/status_paused.svg";
import StatusPending from "../assets/icons/status_pending.svg";
import StatusTodo from "../assets/icons/status_todo.svg";

export const statusIcon = (status: string) => {
  switch (status) {
    case "blocked":
      return (
        <ThemeIcon variant="outline" size={30}>
          <StatusBlocked size="1.1rem" />
        </ThemeIcon>
      );

    case "cancelled":
      return (
        <ThemeIcon variant="light" size={30}>
          <StatusCancelled size="1.1rem" />
        </ThemeIcon>
      );

    case "done":
      return (
        <ThemeIcon variant="light" size={30}>
          <StatusDone size="1.1rem" />
        </ThemeIcon>
      );

    case "fail":
      return (
        <ThemeIcon variant="light" size={30}>
          <StatusFail size="1.1rem" />
        </ThemeIcon>
      );

    case "paused":
      return (
        <ThemeIcon variant="light" size={30}>
          <StatusPaused size="1.1rem" />
        </ThemeIcon>
      );

    case "pending":
      return (
        <ThemeIcon variant="light" size={30}>
          <StatusPending size="1.1rem" />
        </ThemeIcon>
      );
    case "todo":
      return (
        <ThemeIcon variant="light" size={30}>
          <StatusTodo size="1.1rem" />
        </ThemeIcon>
      );
  }
};
