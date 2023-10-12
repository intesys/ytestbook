import { Box, Divider, Text, Title } from "@mantine/core";
import React from "react";
import { useParams } from "react-router";
import { useTestbook } from "../../../hooks/useTestbook";
import { TestbookInfo } from "../../../types/testbook";
import { EditableText } from "../../misc/EditableText";

export const Testbook: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const [testbookInfo, save] = useTestbook(testbook || "");

  const saveField = (field: keyof TestbookInfo, value: string) => {
    // @ts-ignore
    save({ ...testbookInfo, [field]: value });
  };

  return (
    <Box>
      <Title>
        <EditableText
          name="name"
          onChange={(value) => {
            saveField("name", value);
          }}
          value={testbookInfo?.name}
        />
      </Title>
      <EditableText
        name="client"
        onChange={(value) => {
          saveField("client", value);
        }}
        value={testbookInfo?.client}
      />
      <Text>Created: {testbookInfo?.created}</Text>
      <Divider my={10} />
      <EditableText
        name="description"
        onChange={(value) => {
          saveField("description", value);
        }}
        value={testbookInfo?.description}
      />
    </Box>
  );
};
