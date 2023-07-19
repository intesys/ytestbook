import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.primary?.[0],
    paddingBottom: 0,
    height: "100%",
    padding: theme.spacing.lg,
    transition: "all 0.3s ease-in-out",
  },

  navbar_header: {
    position: "relative",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colors.primary?.[1]}`,
  },

  navbar_overview_toogle: {
    backgroundImage: theme.fn.gradient(),
    color: "#fff",
    ".mantine-Button-inner": {
      justifyContent: "left",
      ".mantine-Button-leftIcon": {
        marginRight: "initial",
      },
      ".mantine-Button-label": {
        marginLeft: theme.spacing.xs,
      },
    },
  },

  navbar_overview_toogle_content: {
    svg: {
      position: "absolute",
      height: "23px",
      right: "12px",
      top: "8px",
    },
  },

  navbar_toogle: {
    right: `calc(-1*(${theme.spacing.lg} + 13px))`,
    bottom: `calc(-1*(${theme.spacing.lg} + 13px))`,
    position: "absolute",
  },

  navbar_toogle_inner: {
    border: "0px",
    boxShadow: "2px 2px 9px -4px rgba(0, 0, 0, 0.28)",
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
