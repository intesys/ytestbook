import { Box, Divider, Text } from "@mantine/core";
import React from "react";
import { useParams } from "react-router";
import { useTestbook } from "../../../hooks/useTestbook";
import { TestbookInfo } from "../../../types/testbook";
import { EditableHtmlText } from "../../shared/EditableHtmlText";
import { EditableText } from "../../shared/EditableText";
import { EditableTitle } from "../../shared/EditableTitle";

export const Testbook: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const [testbookInfo, save] = useTestbook(testbook || "");

  const saveField = (field: keyof TestbookInfo, value: string) => {
    // @ts-ignore
    save({ ...testbookInfo, [field]: value });
  };

  return (
    <Box>
      <EditableTitle
        name="name"
        onChange={(value) => {
          saveField("name", value);
        }}
        value={testbookInfo?.name}
      />
      <EditableText
        name="client"
        onChange={(value) => {
          saveField("client", value);
        }}
        value={testbookInfo?.client}
      />
      <Text>Created: {testbookInfo?.created}</Text>
      <Divider my={10} />
      <EditableHtmlText
        name="description"
        onChange={(value) => {
          saveField("description", value);
        }}
        value={testbookInfo?.description}
      />
    </Box>
  );
};
