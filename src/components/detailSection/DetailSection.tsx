import { Group } from "@mantine/core";
import { useParams } from "react-router-dom";
import { TestDetails } from "../testDetails/TestDetails";
import { StepDetails } from "../stepDetails/stepDetails";

export const DetailSection = () => {
  const params = useParams();

  return (
    <Group grow align="stretch">
      {params.testId ? <TestDetails /> : null}
      {params.stepId ? <StepDetails /> : null}
    </Group>
  );
};
