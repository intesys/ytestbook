import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },
  input: {
    border: "0px",
    backgroundColor: theme.colors.primary?.[2],
    boxShadow: "0 2px 9px -4px rgba(0, 0, 0, 0.08)",
    input: {
      border: "0px",
      height: "2.25rem",
      padding: "6px 12px",
      color: "#fff !important",
      backgroundColor: theme.colors.primary?.[2],
      "&::placeholder": {
        transition: "color 150ms ease",
        color: "rgba(255,255,255,0.5)",
      },
      "&:invalid": {
        color: "#fff !important",
        "&::placeholder": {
          transition: "color 150ms ease",
          color: "rgba(255,255,255,0.5)",
        },
      },
    },
  },
  error: {
    color: "#fff !important",
  },
  visibilityToggle: {
    backgroundColor: "transparent !important",
    color: "#fff",
  },
}));

export default useStyles;
