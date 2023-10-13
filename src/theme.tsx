import { createTheme } from "@mantine/core";

export const theme = createTheme({
  scale: 1,
  fontFamily: "Work Sans, sans-serif",
  colors: {
    primary: [
      "#eaefff",
      "#d2dbff",
      "#a2b3f8",
      "#7088f4",
      "#4664ef",
      "#2c4ded",
      "#1d42ed",
      "#0f34d4",
      "#052ebe",
      "#0027a8",
    ],
    secondary: [
      "#f5e9ff",
      "#e5cfff",
      "#c79bff",
      "#a864ff",
      "#8d36ff",
      "#7c18ff",
      "#7407ff",
      "#6300e5",
      "#5700cd",
      "#4a00b4",
    ],
    font: [
      "#f5f5f5",
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#575757",
    ],
  },
  primaryColor: "primary",
  defaultGradient: { from: "#0F33CE", to: "#9747FF", deg: 75 },
  headings: {
    sizes: {
      h1: {
        fontSize: "2rem",
        lineHeight: "2.25rem",
        fontWeight: "700",
      },
      h2: {
        fontSize: "1.75rem",
        lineHeight: "2rem",
        fontWeight: "700",
      },
      h3: {
        fontSize: "1.5rem",
        lineHeight: "1.65rem",
        fontWeight: "700",
      },
      h4: {
        fontSize: "1.35rem",
        lineHeight: "1.5rem",
        fontWeight: "700",
      },
      h5: {
        fontSize: "1.2rem",
        lineHeight: "1.3rem",
        fontWeight: "700",
      },
      h6: {
        fontSize: "1rem",
        lineHeight: "1.1rem",
        fontWeight: "700",
      },
    },
  },
});
