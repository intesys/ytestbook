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
import { TestModal } from "../testModal/TestModal";
import { useDisclosure } from "@mantine/hooks";
import { EditableHtmlText } from "../shared/EditableHtmlText";
import { ConfirmDeleteModal } from "../confirmDeleteModal/ConfirmDeleteModal";

export function TestDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const test = useTest(params.projectId, params.caseId, params.testId);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);

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

  if (test.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w={"100%"}>
        <Loader color="blue" size="lg" />
      </Flex>
    );
  } else {
    return (
      <div className={classes.testDetails}>
        <TestModal
          id={test.data.id}
          initialValues={{
            title: test.data.title,
            description: test.data.description || "",
            tags: queriedData?.tags || [],
            assignees:
              queriedData?.assignees.map((assignee) => assignee.id) || [],
          }}
          title="Edit Test"
          opened={opened}
          close={close}
          handleSubmit={testCase.updateTest}
        />
        <ConfirmDeleteModal
          opened={deleteModalOpened}
          close={deleteModalHandlers.close}
          handleConfirm={() => {
            if (project.data && testCase.data) {
              testCase.removeTest(test.data.id);
              navigate(
                `/project/${project.data.id}/testCase/${testCase.data.id}`,
              );
            }
          }}
        />
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
          status={test.data.status}
          title={test.data.title}
          tags={queriedData?.tags || []}
          assignees={queriedData?.assignees || []}
          completion={completion}
          handleEditClick={open}
          handleDeleteClick={deleteModalHandlers.open}
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
            />
          )}
        </div>
      </div>
    );
  }
}
