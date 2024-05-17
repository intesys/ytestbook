import { Group } from "@mantine/core";
import { useParams } from "react-router-dom";
import { StepDetails } from "../stepDetails/StepDetails";
import { TestDetails } from "../testDetails/TestDetails";

export const DetailSection = () => {
  const params = useParams();

  return (
    <Group grow align="stretch">
      {params.testId ? <TestDetails /> : null}
      {params.stepId ? <StepDetails /> : null}
    </Group>
  );
};
