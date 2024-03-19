import { Flex, Loader, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useProject } from "../../lib/operators/useProject";
import { useTestCase } from "../../lib/operators/useTestCase";
import { CommentsList } from "../commentsList/CommentsList";
import { ContentHeader } from "../contentHeader/ContentHeader";
import { TestsTable } from "../testsTable/TestsTable";
import classes from "./testCase.module.scss";
import { computeCompletion } from "../../lib/helpers/computeCompletion";
import { useMemo } from "react";

export function TestCase() {
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);

  const completion = useMemo(
    () => computeCompletion(testCase.data?.tests || []),
    [testCase.data],
  );

  if (testCase.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh">
        <Loader color="blue" size="lg" />
      </Flex>
    );
  } else {
    return (
      <div className={classes.testcase}>
        <ContentHeader
          id={testCase.data.id}
          status={testCase.data.status}
          title={testCase.data.title}
          jiraLink={testCase.data.jiraLink}
          completion={completion}
          handleUpdateStatus={project.updateTestCaseStatus}
          handleEditClick={() => console.log("EDIT")}
          handleDeleteClick={() => project.removeTestCase(testCase.data.id)}
        />

        <div className={classes.description}>
          <Text>{testCase.data.description}</Text>
        </div>

        <div className={classes.tests}>
          <TestsTable
            tests={testCase.data.tests}
            createTest={testCase.createTest}
            updateTestStatus={testCase.updateTestStatus}
          />
        </div>

        <div className={classes.comments}>
          <CommentsList
            comments={testCase.data.comments}
            createComment={testCase.createComment}
            removeComment={testCase.removeComment}
          />
        </div>
      </div>
    );
  }
}
