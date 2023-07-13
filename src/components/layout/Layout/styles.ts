import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  app_layout: {},
  app_header: {},
  app_wrapper: {
    display: "flex",
    height: "calc(100vh - 70px)",
  },
  app_sidebar: {},
  app_main: { padding: "35px" },
}));

export default useStyles;
