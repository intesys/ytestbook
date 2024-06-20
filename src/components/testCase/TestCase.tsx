import { Flex, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { computeCompletion } from "../../lib/helpers/computeCompletion";
import { useProject } from "../../lib/operators/useProject";
import { useTestCase } from "../../lib/operators/useTestCase";
import { TStep } from "../../schema";
import { CommentsList } from "../commentsList/CommentsList";
import { ContentHeader } from "../contentHeader/ContentHeader";
import { EditableHtmlText } from "../shared/EditableHtmlText";
import { TestCaseModal } from "../testCaseModal/TestCaseModal";
import { TestsTable } from "../testsTable/TestsTable";
import classes from "./testCase.module.css";

export function TestCase() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const [opened, { open, close }] = useDisclosure(false);

  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);

  const queriedData = useMemo(() => {
    if (testCase.data) {
      const allSteps = testCase.data.tests.reduce((acc, test) => {
        test.steps.forEach((step) => acc.push(step));
        return acc;
      }, [] as TStep[]);
      const completion = computeCompletion(allSteps);
      const assignees = project.getAssigneesByCaseId(testCase.data.id);
      return { completion, assignees };
    }
  }, [testCase.data]);

  const handleQuickEdit = (value: string) => {
    if (!testCase?.data?.id) {
      return;
    }
    project.updateTestCase(
      {
        title: value,
      },
      testCase.data.id,
    );
  };

  if (testCase.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w={"100%"}>
        <Loader color="blue" size="lg" />
      </Flex>
    );
  } else {
    return (
      <div className={classes.testcase}>
        <TestCaseModal
          id={testCase.data.id}
          initialValues={{
            title: testCase.data.title,
            jiraLink: testCase.data.jiraLink || "",
            description: testCase.data.description || "",
          }}
          title="Edit test case"
          opened={opened}
          close={close}
          handleSubmit={project.updateTestCase}
        />
        {/*<ConfirmDeleteModal
          opened={deleteModalOpened}
          close={deleteModalHandlers.close}
          handleConfirm={() => {
            if (project.data) {
              project.removeTestCase(testCase.data.id);
              navigate(`/project/${project.data.id}`);
            }
          }}
        />*/}
        <ContentHeader
          status={testCase.data.status}
          title={testCase.data.title}
          jiraLink={testCase.data.jiraLink}
          completion={queriedData?.completion || 0}
          assignees={queriedData?.assignees || []}
          handleEditClick={open}
          handleDeleteClick={deleteModalHandlers.open}
          handleQuickEdit={handleQuickEdit}
        />
        <div className={classes.description}>
          <EditableHtmlText
            name="description"
            onChange={(value) => {
              project.updateTestCase(
                {
                  title: testCase.data.title,
                  jiraLink: testCase.data.jiraLink,
                  description: value,
                },
                testCase.data.id,
              );
            }}
            value={testCase.data.description}
          />
        </div>
        <div className={classes.tests}>
          <TestsTable
            tests={testCase.data.tests}
            createTest={testCase.createTest}
          />
        </div>
        <div className={classes.comments}>
          <CommentsList
            comments={testCase.data.comments}
            createComment={testCase.createComment}
            removeComment={testCase.removeComment}
            updateCommentResolved={testCase.updateCommentResolved}
            filter={{
              elements: testCase.data.tests,
              type: "test",
            }}
          />
        </div>
      </div>
    );
  }
}
