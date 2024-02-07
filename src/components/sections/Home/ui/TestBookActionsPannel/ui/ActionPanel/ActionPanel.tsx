import React from "react";
import classes from "../../testBookActionsPannel.module.scss";
import { Stack, Text } from "@mantine/core";
import { CreateTestBook } from "../CreateTestBook/CreateTestBook";
import { UploadTextBook } from "../FileUploader/UploadTextBook";
import { TestBookPanelVariant } from "../../../../types";

type Props = {
  title: string;
  variant: TestBookPanelVariant;
  handleCreateTestBook: () => void;
};

export const ActionPanel: React.FC<Props> = ({
  variant,
  title,
  handleCreateTestBook,
}) => {
  const ActionElement = variant === "CREATE" ? CreateTestBook : UploadTextBook;

  return (
    <Stack h="100%" className={classes.cardWrapper}>
      <Text>{title}</Text>
      <ActionElement
        onFileUpload={() => {}}
        handleCreateTestBook={handleCreateTestBook}
      />
    </Stack>
  );
};
