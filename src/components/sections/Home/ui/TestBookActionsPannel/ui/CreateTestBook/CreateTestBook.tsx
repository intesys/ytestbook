import { Card, Stack, Text } from "@mantine/core";

import classes from "./createTestBook.module.scss";
import React from "react";

type Props = {
  handleCreateTestBook: ()=> void;
}

export const CreateTestBook: React.FC<Props> = ({handleCreateTestBook}) => {
  const handleClick = ()=> {
    handleCreateTestBook()
  }
  return (
    <Card w="100%" h="100%" radius="lg" padding="xl" className={classes.card} onClick={handleClick}>
      <Stack className={classes.textWrapper} align="center" gap="1.8125">
        <span>X icon</span>
        <Text fw={500} tt="uppercase" fz="1rem">
          Drag and drop the Testbook file here
        </Text>
      </Stack>
    </Card>
  );
};
