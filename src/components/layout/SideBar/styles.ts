import { createStyles } from "@mantine/core";

export const useNavbarStyles = createStyles((theme) => ({
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

  navbar_links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  navbar_links_inner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
}));

export const useQuickCloseStyles = createStyles((theme) => ({
  navbar_toogle: {
    right: `calc(-1*(${theme.spacing.lg} + 13px))`,
    position: "absolute",
  },

  navbar_toogle_inner: {
    border: "0px",
    boxShadow: "2px 2px 9px -4px rgba(0, 0, 0, 0.28)",
  }
}));

export const useOverviewButtonStyles = createStyles((theme) => ({
  group: {
    backgroundImage: theme.fn.gradient(),
    width: "100%",
    height: "45px",
    color: "#ffffff",
    borderRadius: "8px",
    cursor: "pointer"
  },
  icon: {
    width: "23px"
  }
}));

