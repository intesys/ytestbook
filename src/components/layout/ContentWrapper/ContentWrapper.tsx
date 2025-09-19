import { PropsWithChildren } from "react";
import { Flex } from "@mantine/core";
import classes from "./ContentWrapper.module.css";

export const ContentWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Flex dir="column" w="100%" className={classes.contentWrapper}>
      {children}
    </Flex>
  );
};
