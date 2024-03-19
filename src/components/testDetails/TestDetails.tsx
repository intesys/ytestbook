import { Button, Flex, Loader, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import ArrowCircle from "../../assets/icons/arrow_circle_right.svg";
import { useProject } from "../../lib/operators/useProject";
import { useTest } from "../../lib/operators/useTest";
import { useTestCase } from "../../lib/operators/useTestCase";
import { CommentsList } from "../commentsList/CommentsList";
import { ContentHeader } from "../contentHeader/ContentHeader";
import { StepsTable } from "../stepsTable/StepsTable";
import classes from "./testDetails.module.scss";
import { useMemo } from "react";
import { computeCompletion } from "../../lib/helpers/computeCompletion";

export function TestDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const test = useTest(params.projectId, params.caseId, params.testId);

  const completion = useMemo(
    () => computeCompletion(test.data?.steps || []),
    [test.data],
  );

  if (test.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh">
        <Loader color="blue" size="lg" />
      </Flex>
    );
  } else {
    return (
      <div className={classes.testDetails}>
        <div className={classes.backButton}>
          <Button
            variant="transparent"
            leftSection={<img src={ArrowCircle} />}
            p={0}
            onClick={() => {
              if (project.data && testCase.data) {
                navigate(
                  `/project/${project.data.id}/testCase/${testCase.data.id}`,
                );
              }
            }}
          >
            <Text c={"black"}>Go to test case — {test.data.caseId}</Text>
          </Button>
        </div>
        <ContentHeader
          id={test.data.id}
          status={test.data.status}
          title={test.data.title}
          completion={completion}
          handleUpdateStatus={testCase.updateTestStatus}
          handleEditClick={() => console.log("EDIT")}
          handleDeleteClick={() => {
            if (project.data && testCase.data) {
              testCase.removeTest(test.data.id);
              navigate(
                `/project/${project.data.id}/testCase/${testCase.data.id}`,
              );
            }
          }}
        />

        <div className={classes.description}>
          <Text>{test.data.description}</Text>
        </div>

        <div className={classes.steps}>
          <StepsTable
            steps={test.data.steps}
            createStep={test.createStep}
            updateStepStatus={test.updateStepStatus}
            removeStep={test.removeStep}
          />
        </div>

        <div className={classes.comments}>
          {testCase.data && (
            <CommentsList
              testId={test.data.id}
              comments={testCase.data.comments.filter(
                (comment) => comment.testId === test.data.id,
              )}
              createComment={testCase.createComment}
              removeComment={testCase.removeComment}
            />
          )}
        </div>
      </div>
    );
  }
}
