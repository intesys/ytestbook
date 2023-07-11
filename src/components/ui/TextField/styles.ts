import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },
  input: {
    padding: "6px 12px",
    border: "0px",
    color: "#fff !important",
    backgroundColor: theme.colors.primary?.[2],
    boxShadow: "0 2px 9px -4px rgba(0, 0, 0, 0.08)",
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
  error: {
    color: "#fff !important",
  },
}));

export default useStyles;
