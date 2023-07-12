import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  login_layout: {
    height: "100vh",
    backgroundImage: theme.fn.gradient(),
  },
  login_container: {
    position: "relative",
    top: "15%",
  },
  login_logo: {
    marginBottom: "35px",
    svg: {
      width: "80px",
    },
  },
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
