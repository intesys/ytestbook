import { PropsWithChildren } from "react";
import classes from "./ContentWrapper.module.css";
import { Flex } from "@mantine/core";

export const ContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex dir="column" w="100%" className={classes.contentWrapper}>
      {children}
    </Flex>
  );
};
