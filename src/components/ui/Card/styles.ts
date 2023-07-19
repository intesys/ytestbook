import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    textAlign: "initial",
  },
  card_header: {
    color: "#fff",
    textAlign: "center",
  },
  card_content: {
    backgroundColor: theme.colors.primary?.[2],
  },
  card_checkbok: {
    input: {
      cursor: "pointer",
    },
    label: {
      color: "#fff",
      cursor: "pointer",
    },
  },
}));

export default useStyles;
