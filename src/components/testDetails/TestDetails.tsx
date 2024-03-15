import { useNavigate, useParams } from "react-router-dom";
import { ContentHeader } from "../contentHeader/ContentHeader";
import classes from "./testDetails.module.scss";
import { Flex, Loader, Text } from "@mantine/core";
import { useTest } from "../../lib/operators/useTest";
import { StepsTable } from "../stepsTable/StepsTable";
import { useTestCase } from "../../lib/operators/useTestCase";
import { useProject } from "../../lib/operators/useProject";
import { CommentsList } from "../commentsList/CommentsList";

export function TestDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const test = useTest(params.projectId, params.caseId, params.testId);

  if (test.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh">
        <Loader color="blue" size="lg" />
      </Flex>
    );
  } else {
    return (
      <div className={classes.testDetails}>
        <ContentHeader
          title={test.data.title}
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
