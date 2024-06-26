import { Flex, Loader } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { computeCompletion } from "../../lib/helpers/computeCompletion";
import { useProject } from "../../lib/operators/useProject";
import { useTestCase } from "../../lib/operators/useTestCase";
import { TStep } from "../../schema";
import { CommentsList } from "../commentsList/CommentsList";
import { ContentHeader } from "../contentHeader/ContentHeader";
import { Modals, openDeleteConfirmModal } from "../modals/modals.ts";
import { EditableHtmlText } from "../shared/EditableHtmlText";
import { TestsTable } from "../testsTable/TestsTable";
import classes from "./testCase.module.css";

export function TestCase() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);

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
  }, [project, testCase.data]);

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

  const editClickHandler = useCallback(
    () =>
      modals.openContextModal({
        modal: Modals.TestCaseModal,
        title: "Edit test case",
        size: "xl",
        innerProps: {
          projectId: project.data?.id ?? "",
          id: testCase?.data?.id,
          initialValues: {
            title: testCase?.data?.title ?? "",
            jiraLink: testCase?.data?.jiraLink ?? "",
            description: testCase?.data?.description ?? "",
          },
          handleSubmit: project.updateTestCase,
        },
      }),
    [
      project.data?.id,
      project.updateTestCase,
      testCase?.data?.description,
      testCase?.data?.id,
      testCase?.data?.jiraLink,
      testCase?.data?.title,
    ],
  );

  const deleteClickHandler = useCallback(
    () =>
      openDeleteConfirmModal(
        "Are you sure you want to delete this test case?",
        {
          handleConfirm: () => {
            if (project.data) {
              project.removeTestCase(testCase?.data?.id);
              navigate(`/project/${project.data.id}`);
            }
          },
        },
      ),
    [navigate, project, testCase?.data?.id],
  );

  if (testCase.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w="100%">
        <Loader color="blue" size="lg" />
      </Flex>
    );
  }

  return (
    <div className={classes.testcase}>
      <ContentHeader
        status={testCase.data.status}
        title={testCase.data.title}
        jiraLink={testCase.data.jiraLink}
        completion={queriedData?.completion ?? 0}
        assignees={queriedData?.assignees ?? []}
        handleEditClick={editClickHandler}
        handleDeleteClick={deleteClickHandler}
        handleQuickEdit={handleQuickEdit}
        tags={project.getTagsByCaseId(testCase.data.id)}
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
