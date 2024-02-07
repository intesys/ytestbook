import React from "react";
import { Card, Stack, Text, InputLabel, Flex } from "@mantine/core";
import classes from "./fileUploader.module.scss";
import { notifications } from "@mantine/notifications";

type FileUploaderProps = {
  onFileUpload: (file: File) => void;

};

const handleWrongFormatUpploadError = () => {
  notifications.show({
    id: "error_testbook_upload",
    title: "Error uploading testbook file",
    message: "Please choose a JSON file.",
  });
};

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/json") {
        onFileUpload(file);
      } else {
        handleWrongFormatUpploadError();
      }
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/json") {
        onFileUpload(file);
      } else {
        handleWrongFormatUpploadError();
      }
    }
  };

  return (
    <Card
      w="100%"
      h="100%"
      radius="lg"
      padding="xl"
      withBorder={true}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={classes.card}
    >
      <Stack align="center" gap={0}>
        <Stack className={classes.textWrapper} align="center" gap="1.8125">
          <span>JSON icon</span>
          <Text fw={500} tt="uppercase" fz="1rem">
            Drag and drop the Testbook file here
          </Text>
        </Stack>

        <Flex mt="1.625rem" className={classes.labelWrapper}>
          <Text fw={400}>or</Text>
          <InputLabel
            fw={500}
            fz="1rem"
            ml="5px"
            htmlFor="file-upload"
            className={classes.inputLabel}
          >
            Browse
          </InputLabel>
        </Flex>

        <input
          id="file-upload"
          type="file"
          accept=".json"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </Stack>
    </Card>
  );
};
