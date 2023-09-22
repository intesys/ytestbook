import React from "react";
import { useParams } from "react-router";
import { useTestbook } from "../../../hooks/useTestbook";
import { Box, Title, Text, Mark, Code, Divider } from "@mantine/core";

export const Testbook: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const [testbookInfo] = useTestbook(testbook || "");

  return (
    <Box>
      <Title>{testbookInfo?.name}</Title>
      <Text>Client: {testbookInfo?.client}</Text>
      <Text>Created: {testbookInfo?.created}</Text>
      <Divider my={10} />
      <Mark>TODO:</Mark> edit and add description, requirements, expectations,
      deadlines...
      <Divider my={10} />
      Data: <Code>{JSON.stringify(testbookInfo)}</Code>
    </Box>
  );
};
