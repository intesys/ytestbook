import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    padding: "10px",
    alignItems: "center",
    position: "relative",
    zIndex: 50,
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 10px 15px -5px rgba(0, 0, 0, 0.05), 0 7px 7px -5px rgba(0, 0, 0, 0.04);",
  },
  header_logo: {
    width: "50px",
    display: "flex",
    marginRight: "10px",
  },
  header_title: {},
}));

export default useStyles;
