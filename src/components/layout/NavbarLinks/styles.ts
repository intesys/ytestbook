import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  control: {
    width: "100%",
    fontWeight: 500,
    padding: "6px 12px",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.xs,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export default useStyles;
