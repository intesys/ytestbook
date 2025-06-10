import { DefaultMantineColor } from "@mantine/core";
import { StatusEnum } from "../../types/schema";

export const getStatusLabel = (status?: StatusEnum): DefaultMantineColor => {
  switch (status) {
    case StatusEnum.BLOCKED:
      return "Blocked";

    case StatusEnum.CANCELLED:
      return "Cancelled";

    case StatusEnum.DONE:
      return "Done";

    case StatusEnum.FAIL:
      return "Fail";

    case StatusEnum.PAUSED:
      return "Paused";

    case StatusEnum.PENDING:
      return "Pending";

    case StatusEnum.TODO:
      return "TODO";

    default:
      return "Pending";
  }
};
