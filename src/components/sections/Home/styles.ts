import { createStyles } from "@mantine/core";

export const useHomeStyles = createStyles((theme) => ({
  home_layout: {
    height: "100vh",
  },
  home_container: {},
  home_logo: {
    marginBottom: "35px",
    svg: {
      width: "80px",
    },
  },
  home_first: {
    minHeight: "50vh",
    padding: "100px 0px",
    backgroundImage: theme.fn.gradient(),
  },
  home_second: {
    minHeight: "50vh",
    padding: "100px 0px",
    backgroundColor: theme.colors.primary?.[0],
  }
}));

export const useCardStyles = createStyles((theme) => ({
  card: {
    textAlign: "initial",
    backgroundColor: theme.colors.primary?.[2],
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
  }
}));

export const useTableStyles = createStyles((theme) => ({
  table_header: {},
  table_content: {
    thead: {
      backgroundColor: theme.colors.primary?.[1],
    },
  },
}));

