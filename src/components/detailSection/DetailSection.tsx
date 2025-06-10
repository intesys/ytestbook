import { Group, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { StepDetails } from "../stepDetails/stepDetails";
import { TestDetails } from "../testDetails/TestDetails";

export const DetailSection = () => {
  const params = useParams();

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const testIsVisible = useMemo(() => {
    if (!params.testId) {
      return false;
    }

    if (params.stepId && isMobile) {
      return false;
    }

    return true;
  }, [isMobile, params.stepId, params.testId]);

  return (
    <Group grow align="stretch">
      {testIsVisible ? <TestDetails /> : null}
      {params.stepId ? <StepDetails /> : null}
    </Group>
  );
};
