import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    columnGap: "10px",
    height: "80px",
    padding: "0 20px",
    position: "relative",
    zIndex: 50,
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 10px 15px -5px rgba(0, 0, 0, 0.05), 0 7px 7px -5px rgba(0, 0, 0, 0.04);",
  },
  header_logo: {
    display: "flex",
    alignItems: "center",
    width: "55px",
    // marginRight: "10px",
  },
  logo_wrapper: {
    display: "flex"
  },
  header_title: {},
}));

export default useStyles;
