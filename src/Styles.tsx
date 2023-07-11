import { Global } from "@mantine/core";
import React from "react";

const Styles: React.FC = () => {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": { boxSizing: "border-box" },
        "h1, h2, h3, h4, h5, h6, p": { margin: "0px" },
        body: {
          overflowX: "hidden",
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSizes.sm,
          lineHeight: theme.lineHeight,
          color: theme.colors.font[4],
        },
        h1: {
          fontFamily: theme.fontFamily,
          color: theme.colors.font[4],
          fontSize: theme.headings.sizes.h1.fontSize,
          fontWeight: theme.headings.sizes.h1.fontWeight as number,
          lineHeight: theme.headings.sizes.h1.lineHeight,
        },
        h2: {
          fontFamily: theme.fontFamily,
          color: theme.colors.font[4],
          fontSize: theme.headings.sizes.h2.fontSize,
          fontWeight: theme.headings.sizes.h2.fontWeight as number,
          lineHeight: theme.headings.sizes.h2.lineHeight,
        },
        h3: {
          fontFamily: theme.fontFamily,
          color: theme.colors.font[4],
          fontSize: theme.headings.sizes.h3.fontSize,
          fontWeight: theme.headings.sizes.h3.fontWeight as number,
          lineHeight: theme.headings.sizes.h3.lineHeight,
        },
        h4: {
          fontFamily: theme.fontFamily,
          color: theme.colors.font[4],
          fontSize: theme.headings.sizes.h4.fontSize,
          fontWeight: theme.headings.sizes.h4.fontWeight as number,
          lineHeight: theme.headings.sizes.h4.lineHeight,
        },
        h5: {
          fontFamily: theme.fontFamily,
          color: theme.colors.font[4],
          fontSize: theme.headings.sizes.h5.fontSize,
          fontWeight: theme.headings.sizes.h5.fontWeight as number,
          lineHeight: theme.headings.sizes.h5.lineHeight,
        },
        h6: {
          fontFamily: theme.fontFamily,
          color: theme.colors.font[4],
          fontSize: theme.headings.sizes.h6.fontSize,
          fontWeight: theme.headings.sizes.h6.fontWeight as number,
          lineHeight: theme.headings.sizes.h6.lineHeight,
        },
        input: {
          "&:-webkit-autofill, &:-webkit-autofill::first-line, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
            {
              fontFamily: theme.fontFamily,
              transition: "background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s",
            },
        },
      })}
    />
  );
};

export default Styles;
