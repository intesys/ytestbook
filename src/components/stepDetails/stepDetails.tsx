import { Button, Flex, Loader, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import CircleX from "../../assets/icons/circle_x.svg";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { useProject } from "../../lib/operators/useProject";
import { useStep } from "../../lib/operators/useStep";
import { useTest } from "../../lib/operators/useTest";
import { useTestCase } from "../../lib/operators/useTestCase";
import { StatusEnum } from "../../schema";
import { CommentsList } from "../commentsList/CommentsList";
import { ContentHeader } from "../contentHeader/ContentHeader";
import { EditableHtmlText } from "../shared/EditableHtmlText";
import { StepSwitch } from "../stepSwitch/StepSwitch";
import { ClosestStepsButtons } from "./ClosestStepsButtons";
import classes from "./stepDetails.module.scss";

export const StepDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const test = useTest(params.projectId, params.caseId, params.testId);
  const step = useStep(
    params.projectId,
    params.caseId,
    params.testId,
    params.stepId,
  );

  if (step.loading || project.loading || testCase.loading || test.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w={"100%"} bg="gray.0">
        <Loader color="blue" size="lg" />
      </Flex>
    );
  }

  const handleQuickEdit = (title: string) => {
    test.updateStep(
      {
        title,
      },
      step.data.id,
    );
  };

  const handleDeleteClick = () => {
    test.removeStep(step.data.id);
    closeStep();
  };

  const closeStep = () => {
    if (!params.projectId || !params.caseId || !params.testId) {
      return;
    }
    navigate(
      routesHelper.testDetail(params.projectId, params.caseId, params.testId),
    );
  };

  const onStatusChange = (status: StatusEnum) => {
    test.updateStepStatus(step.data.id, status);
  };

  return (
    <div className={classes.stepDetails}>
      <div className={classes.backButton}>
        <Button
          variant="transparent"
          leftSection={<img src={CircleX} />}
          p={0}
          onClick={closeStep}
        >
          <Text c={"black"}>Close</Text>
        </Button>
      </div>
      <ContentHeader
        status={step.data.status}
        title={step.data.title}
        handleDeleteClick={handleDeleteClick}
        handleQuickEdit={handleQuickEdit}
      />
      <div className={classes.description}>
        <EditableHtmlText
          name="description"
          onChange={(value) => {
            test.updateStep(
              {
                title: step.data.title,
                description: value,
              },
              step.data.id,
            );
          }}
          value={step.data.description}
        />
      </div>

      <div className={classes.stepSwitch}>
        <StepSwitch
          currentStatus={step.data.status}
          onChange={onStatusChange}
        />
      </div>

      <div className={classes.closestSteps}>
        <ClosestStepsButtons
          caseId={testCase.data?.id}
          projectId={project.data.id}
          stepId={step.data.id}
          steps={test.data?.steps}
          testId={test.data?.id}
        />
      </div>

      <div className={classes.comments}>
        {testCase.data && test.data && (
          <CommentsList
            testId={test.data.id}
            stepId={step.data.id}
            comments={testCase.data.comments.filter(
              (comment) => comment.stepId === step.data.id,
            )}
            createComment={testCase.createComment}
            removeComment={testCase.removeComment}
          />
        )}
      </div>
    </div>
  );
};
