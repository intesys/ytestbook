import { Box, Button, Flex, Text } from "@mantine/core";
import { getNextStep, getPreviousStep } from "../../lib/helpers/stepsHelpers";
import { TStep } from "../../types/schema";

import { useNavigate } from "react-router";
import { routesHelper } from "../../lib/helpers/routesHelper";
import ArrowCircleDown from "../../assets/icons/arrow_circle_down.svg";
import ArrowCircleUp from "../../assets/icons/arrow_circle_up.svg";
import { useServerName } from "../../lib/helpers/useServerName";

type ClosestStepsButtonsProps = {
  stepId: string;
  projectId: string;
  caseId: string;
  testId: string;
  steps: TStep[];
};
export const ClosestStepsButtons = ({
  caseId,
  projectId,
  stepId,
  testId,
  steps,
}: ClosestStepsButtonsProps) => {
  const serverName = useServerName();
  const previousStep = getPreviousStep(stepId, steps);
  const nextStep = getNextStep(stepId, steps);
  const navigate = useNavigate();

  const goToPreviousStep = () => {
    if (!previousStep?.id) {
      return;
    }
    navigate(
      routesHelper.stepDetail(
        serverName,
        projectId,
        caseId,
        testId,
        previousStep.id,
      ),
    );
  };

  const goToNextStep = () => {
    if (!nextStep?.id) {
      return;
    }
    navigate(
      routesHelper.stepDetail(
        serverName,
        projectId,
        caseId,
        testId,
        nextStep.id,
      ),
    );
  };

  if (!previousStep && !nextStep) {
    return null;
  }

  return (
    <Flex justify="space-between">
      <Box>
        {previousStep ? (
          <Button
            variant="transparent"
            leftSection={<img src={ArrowCircleUp} />}
            p={0}
            onClick={goToPreviousStep}
          >
            <Text c={"black"}>Previous step</Text>
          </Button>
        ) : null}
      </Box>
      <Box>
        {nextStep ? (
          <Button
            variant="transparent"
            leftSection={<img src={ArrowCircleDown} />}
            p={0}
            onClick={goToNextStep}
          >
            <Text c={"black"}>Next step</Text>
          </Button>
        ) : null}
      </Box>
    </Flex>
  );
};
