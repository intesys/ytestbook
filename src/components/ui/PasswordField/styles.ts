import { createStyles } from "@mantine/core";
import { TInputVariant } from "../../../types";

const useStyles = createStyles((theme, variant: TInputVariant) => ({
  root: {
    position: "relative",
  },
  input: {
    border: "0px",
    boxShadow: "0 2px 9px -4px rgba(0, 0, 0, 0.08)",
    ...(variant === "blue" && {
      backgroundColor: theme.colors.primary?.[3],
    }),
    input: {
      border: "0px",
      height: "2.25rem",
      padding: "6px 12px",
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
  },
  error: {
    ...(variant === "blue" && {
      color: "#fff !important",
    }),
  },
  visibilityToggle: {
    ...(variant === "blue" && {
      backgroundColor: "transparent !important",
      color: "#fff",
    }),
  },
}));

export default useStyles;
