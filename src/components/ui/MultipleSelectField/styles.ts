import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },
  input: {
    padding: "2px 30px 2px 12px",
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
  },
  error: {},
}));

export default useStyles;
