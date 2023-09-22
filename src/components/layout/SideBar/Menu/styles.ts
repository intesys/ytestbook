import { createStyles } from "@mantine/core";

export const useListStyles = createStyles((theme) => ({
  ul: {
    ul: {
      margin: "0 0 30px 0",
      borderLeft: "1px solid #D9DFF6",
      position: "relative",
      // top: "-10px",
      left: "-25px",
      li: {
        position: "relative",
        // top: "-10px",
        listStyleType: "none",
        borderBottom: "1px solid #D9DFF6",
        paddingLeft: "30px",
        div: {
          position: "relative",
          top: "15px",
        }
      }
    }
  }
}));