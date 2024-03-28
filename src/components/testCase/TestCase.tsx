import { Flex, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { computeCompletion } from "../../lib/helpers/computeCompletion";
import { useProject } from "../../lib/operators/useProject";
import { useTestCase } from "../../lib/operators/useTestCase";
import { CommentsList } from "../commentsList/CommentsList";
import { ContentHeader } from "../contentHeader/ContentHeader";
import { EditableHtmlText } from "../shared/EditableHtmlText";
import { TestCaseModal } from "../testCaseModal/TestCaseModal";
import { TestsTable } from "../testsTable/TestsTable";
import classes from "./testCase.module.scss";
import { ConfirmDeleteModal } from "../confirmDeleteModal/ConfirmDeleteModal";

export function TestCase() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const [opened, { open, close }] = useDisclosure(false);

  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);

  const queriedData = useMemo(() => {
    if (testCase.data) {
      const completion = computeCompletion(testCase.data.tests);
      const assignees = project.getAssigneesByCaseId(testCase.data.id);
      return { completion, assignees };
    }
  }, [testCase.data]);

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

        <ConfirmDeleteModal
          opened={deleteModalOpened}
          close={deleteModalHandlers.close}
          handleConfirm={() => {
            if (project.data) {
              project.removeTestCase(testCase.data.id);
              navigate(`/project/${project.data.id}`);
            }
          }}
        />

        <ContentHeader
          id={testCase.data.id}
          status={testCase.data.status}
          title={testCase.data.title}
          jiraLink={testCase.data.jiraLink}
          completion={queriedData?.completion || 0}
          assignees={queriedData?.assignees || []}
          handleUpdateStatus={project.updateTestCaseStatus}
          handleEditClick={open}
          handleDeleteClick={deleteModalHandlers.open}
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
