import { IconType } from "react-icons";
import {
  MdCheckCircle,
  MdDangerous,
  MdDeleteForever,
  MdNotStarted,
  MdPauseCircle,
  MdPending,
  MdReportProblem,
} from "react-icons/md";
import { StatusEnum } from "@/types/schema.ts";

/**
 * Returns the corresponding icon component for a given status.
 *
 * Example:
 * `const Icon  = getStatusIcon(status);`.
 * Then use `<Icon />` where needed
 *
 * @param {StatusEnum} status - The status to get the icon for.
 * @returns {IconType} The icon component associated with the status.
 */
export const getStatusIcon = (status?: StatusEnum): IconType => {
  switch (status) {
    case StatusEnum.BLOCKED:
      return MdDeleteForever;
    case StatusEnum.CANCELLED:
      return MdDangerous;
    case StatusEnum.DONE:
      return MdCheckCircle;
    case StatusEnum.FAIL:
      return MdReportProblem;
    case StatusEnum.PAUSED:
      return MdPauseCircle;
    case StatusEnum.PENDING:
      return MdPending;
    default:
    case StatusEnum.TODO:
      return MdNotStarted;
  }
};
