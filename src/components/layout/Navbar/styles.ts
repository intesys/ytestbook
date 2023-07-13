import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.primary?.[0],
    paddingBottom: 0,
    height: "100%",
  },

  navbar_header: {
    paddingTop: 0,
    padding: theme.spacing.md,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  navbar_toogle: {
    backgroundImage: theme.fn.gradient(),
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
    },
    ".mantine-Button-inner": {
      justifyContent: "left",
    },
  },

  navbar_toogle_content: {
    svg: {
      position: "absolute",
      height: "23px",
      right: "12px",
      top: "8px",
    },
  },

  navbar_links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  navbar_links_inner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

export default useStyles;
