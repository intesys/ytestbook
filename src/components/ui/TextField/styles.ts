import { createStyles } from "@mantine/core";
import { TInputVariant } from "../../../types";

const variant = "light";

const useStyles = createStyles((theme, variant: TInputVariant) => ({
  root: {
    position: "relative",
  },
  input: {
    padding: "6px 12px",
    border: "0px",
    boxShadow: "0 2px 9px -4px rgba(0, 0, 0, 0.08)",
    "&::placeholder": {
      transition: "color 150ms ease",
    },
    "&:invalid": {
      "&::placeholder": {
        transition: "color 150ms ease",
      },
    },
    ...(variant === "blue" && {
      color: "#fff !important",
      backgroundColor: theme.colors.primary?.[3],
      "&::placeholder": {
        color: "rgba(255,255,255,0.5)",
      },
      "&:invalid": {
        color: "#fff !important",
        "&::placeholder": {
          color: "rgba(255,255,255,0.5)",
        },
      },
    }),
  },

  error: {
    ...(variant === "blue" && {
      color: "#fff !important",
    }),
  },
}));

export default useStyles;
