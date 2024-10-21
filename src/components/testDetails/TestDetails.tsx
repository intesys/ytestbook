import { Button, Image, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowCircle from "../../assets/icons/arrow_circle_right.svg";
import { computeCompletion } from "../../lib/helpers/computeCompletion";
import { routesHelper } from "../../lib/helpers/routesHelper.ts";
import { useServerName } from "../../lib/helpers/useServerName.ts";
import { TOperatorLoaderStatus } from "../../lib/operators/types.ts";
import { useProject } from "../../lib/operators/useProject";
import { useTest } from "../../lib/operators/useTest";
import { useTestCase } from "../../lib/operators/useTestCase";
import { CommentsList } from "../commentsList/CommentsList";
import { ContentHeader } from "../contentHeader/ContentHeader";
import { Modals, openDeleteConfirmModal } from "../modals/modals.ts";
import { EditableHtmlText } from "../shared/EditableHtmlText";
import { SectionError } from "../shared/SectionError.tsx";
import { SectionLoading } from "../shared/SectionLoading.tsx";
import { StepsTable } from "../stepsTable/StepsTable";
import classes from "./testDetails.module.css";

export function TestDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const test = useTest(params.projectId, params.caseId, params.testId);
  const serverName = useServerName();

  const completion = useMemo(
    () => computeCompletion(test.data?.steps || []),
    [test.data],
  );

  const queriedData = useMemo(() => {
    if (test.data) {
      const tags = project.getTagsByTestId(test.data.id);
      const assignees = project.getAssigneesByTestId(test.data.id);
      return { tags, assignees };
    }
  }, [test.data, project]);

  const handleQuickEdit = (value: string) => {
    if (!test.data?.id) {
      return;
    }
    testCase.updateTest(
      {
        title: value,
        assignees: queriedData?.assignees.map((assignee) => assignee.id) || [],
        tags: queriedData?.tags || [],
        description: test?.data?.description || "",
      },
      test.data.id,
    );
  };

  const editClickHandler = useCallback(
    () =>
      modals.openContextModal({
        modal: Modals.TestModal,
        title: "Edit Test",
        size: "xl",
        innerProps: {
          project,
          id: test?.data?.id,
          initialValues: {
            title: test?.data?.title ?? "",
            description: test?.data?.description ?? "",
            tags: queriedData?.tags ?? [],
            assignees:
              queriedData?.assignees.map((assignee) => assignee.id) ?? [],
          },
          handleSubmit: testCase.updateTest,
        },
      }),
    [
      project,
      queriedData?.assignees,
      queriedData?.tags,
      test?.data?.description,
      test?.data?.id,
      test?.data?.title,
      testCase.updateTest,
    ],
  );

  const deleteClickHandler = useCallback(
    () =>
      openDeleteConfirmModal("Are you sure you want to delete this test?", {
        handleConfirm: () => {
          if (project.data && testCase.data) {
            testCase.removeTest(test?.data?.id);
            navigate(
              routesHelper.testCaseDetail(
                serverName,
                project.data.id,
                testCase.data.id,
              ),
            );
          }
        },
      }),
    [navigate, project.data, serverName, test?.data?.id, testCase],
  );

  if (test.status === TOperatorLoaderStatus.loading) {
    return <SectionLoading />;
  }

  if (test.status === TOperatorLoaderStatus.error) {
    return <SectionError />;
  }

  return (
    <div className={classes.testDetails}>
      <div className={classes.backButton}>
        <Button
          variant="transparent"
          leftSection={<Image alt="" src={ArrowCircle} />}
          p={0}
          onClick={() => {
            if (project.data && testCase.data) {
              navigate(
                routesHelper.testCaseDetail(
                  serverName,
                  project.data.id,
                  testCase.data.id,
                ),
              );
            }
          }}
        >
          <Text c={"black"} style={{ whiteSpace: "normal" }} ta="left">
            Go to test case — {test.data.title}
          </Text>
        </Button>
      </div>
      <ContentHeader
        status={test.data.status}
        title={test.data.title}
        tags={queriedData?.tags || []}
        assignees={queriedData?.assignees || []}
        completion={completion}
        handleEditClick={editClickHandler}
        handleDeleteClick={deleteClickHandler}
        handleQuickEdit={handleQuickEdit}
      />
      <div className={classes.description}>
        <EditableHtmlText
          name="description"
          onChange={(value) => {
            testCase.updateTestDescription(test.data.id, value);
          }}
          value={test.data.description}
        />
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
            updateCommentResolved={testCase.updateCommentResolved}
            filter={{
              elements: test.data.steps,
              type: "step",
            }}
          />
        )}
      </div>
    </div>
  );
}
