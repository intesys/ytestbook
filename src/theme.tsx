import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  fontFamily: "Work Sans, sans-serif",
  colors: {
    primary: [
      "#ebeefb",
      "#d3d9f6",
      "#91A4F7",
      "#6F88F5",
      "#0F33CE", // Default primary color
      "#0E2EB9",
      "#0C29A7",
      "#0B2596",
      "#0A2187",
      "#081B6D",
    ],
    secondary: [
      "#EDDEFF",
      "#D4B3FF",
      "#BE8BFF",
      "#A968FF",
      "#9747FF", // Default secondary color
      "#8526FF",
      "#7409FF",
      "#6700EE",
      "#5D00D6",
      "#4B00AD",
    ],
    font: [
      "#6A6A6A",
      "#616161",
      "#585858",
      "#494949",
      "#3C3C3C", // Default font color
      "#363636",
      "#313131",
      "#2C2C2C",
      "#272727",
      "#202020",
    ],
  },
  primaryColor: "primary",
  defaultGradient: { from: "#0F33CE", to: "#9747FF", deg: 75 },
  headings: {
    sizes: {
      h1: {
        fontSize: "2rem",
        lineHeight: "2.25rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "1.75rem",
        lineHeight: "2rem",
        fontWeight: 700,
      },
      h3: {
        fontSize: "1.5rem",
        lineHeight: "1.65rem",
        fontWeight: 700,
      },
      h4: {
        fontSize: "1.35rem",
        lineHeight: "1.5rem",
        fontWeight: 700,
      },
      h5: {
        fontSize: "1.2rem",
        lineHeight: "1.3rem",
        fontWeight: 700,
      },
      h6: {
        fontSize: "1rem",
        lineHeight: "1.1rem",
        fontWeight: 700,
      },
    },
  },
};
