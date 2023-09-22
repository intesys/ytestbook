import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  link: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    borderRadius: theme.radius.md,
    color: theme.colors.font?.[4],

    width: "100%",
    fontWeight: 500,
    padding: "6px 12px",
    fontSize: theme.fontSizes.xs,

    "&:hover": {
      backgroundColor: theme.colors.primary?.[1],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.colors.primary?.[1],
      color: theme.colors.primary?.[4],
    },
  },
}));

export default useStyles;
