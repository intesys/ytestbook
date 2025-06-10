import { DefaultMantineColor } from "@mantine/core";
import { StatusEnum } from "../../types/schema";
import { theme } from "../../theme";

export const getStatusColor = (status?: StatusEnum): DefaultMantineColor => {
  switch (status) {
    case StatusEnum.BLOCKED:
      return "yellow";

    case StatusEnum.CANCELLED:
      return "orange";

    case StatusEnum.DONE:
      return "green";

    case StatusEnum.FAIL:
      return "red";

    case StatusEnum.PAUSED:
      return "gray";

    case StatusEnum.PENDING:
      return "blue";

    case StatusEnum.TODO:
      return theme.colors?.secondary?.[8] ?? "#5700cd";

    default:
      return theme.colors?.primary?.[5] ?? "#2c4ded";
  }
};
