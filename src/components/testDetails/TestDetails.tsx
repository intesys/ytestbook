import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Collapse,
  Group,
  Image,
  Stack,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconChevronDown, IconTrash } from "@tabler/icons-react";
import { MouseEvent, useCallback, useMemo } from "react";
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
import { StatusIcon } from "../statusIcon/StatusIcon.tsx";
import { StepsTable } from "../stepsTable/StepsTable";
import classes from "./testDetails.module.css";

export function TestDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const test = useTest(params.projectId, params.caseId, params.testId);
  const serverName = useServerName();

  const [openedRelatedTests, { toggle: toggleRelatedTests }] =
    useDisclosure(false);

  const completion = useMemo(
    () => computeCompletion(test.data?.steps || []),
    [test.data],
  );

  const queriedData = useMemo(() => {
    if (test.data) {
      const tags = project.getTagsByTestId(test.data.id);
      const assignees = project.getAssigneesByTestId(test.data.id);
      const relatedTests = project.getRelatedTestsByTestId(test.data.id);

      return { tags, assignees, relatedTests };
    }
  }, [test.data, project]);

  const handleQuickEdit = (value: string) => {
    if (!test.data?.id) {
      return;
    }
    testCase.updateTest(
      {
        title: value,
        assignees: queriedData?.assignees.map((assignee) => assignee.id) ?? [],
        tags: queriedData?.tags ?? [],
        description: test?.data?.description ?? "",
        relatedTests:
          queriedData?.relatedTests.map((relatedTest) => relatedTest.id) ?? [],
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
            relatedTests:
              queriedData?.relatedTests.map((test) => test.id) ?? [],
          },
          handleSubmit: testCase.updateTest,
        },
      }),
    [
      project,
      queriedData?.assignees,
      queriedData?.tags,
      queriedData?.relatedTests,
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
    <Stack className={classes.testDetails}>
      <Stack className={classes.backButton}>
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
      </Stack>
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
      {queriedData?.relatedTests.length ? (
        <Box className={classes.relatedTests}>
          <UnstyledButton
            onClick={toggleRelatedTests}
            className={classes.relatedTestsButton}
          >
            <Group justify="space-between">
              <Group gap="xs">
                <Badge>{queriedData?.relatedTests.length}</Badge>
                <Title order={4}>Related Tests</Title>
              </Group>
              <IconChevronDown
                style={{
                  transition: "transform 0.2s",
                  transform: openedRelatedTests
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </Group>
          </UnstyledButton>
          <Collapse in={openedRelatedTests}>
            <Table
              verticalSpacing="xs"
              horizontalSpacing="xs"
              w="100%"
              withTableBorder
            >
              {queriedData?.relatedTests.map((relatedTest) => {
                const removeClickHandler = (
                  event: MouseEvent<HTMLButtonElement>,
                ) => {
                  event.preventDefault();
                  event.stopPropagation();

                  openDeleteConfirmModal(
                    "Are you sure you want to delete this relation?",
                    {
                      handleConfirm: () => {
                        if (test.data.id && relatedTest.id) {
                          project.removeRelatedTest(
                            test.data.id,
                            relatedTest.id,
                          );
                        }
                      },
                    },
                  );
                };

                return (
                  <Table.Tr
                    key={relatedTest.id}
                    className={classes.clickableRow}
                    onClick={() =>
                      navigate(
                        routesHelper.testDetail(
                          serverName,
                          params.projectId ?? "",
                          relatedTest.caseId,
                          relatedTest.id,
                        ),
                      )
                    }
                  >
                    <Table.Td>
                      <Group gap={6} wrap="nowrap">
                        <StatusIcon status={relatedTest.status} />
                        {relatedTest.title}
                      </Group>
                    </Table.Td>
                    <Table.Td align="right">
                      <ActionIcon
                        size="lg"
                        variant="subtle"
                        radius="xl"
                        color="dark"
                        onClick={removeClickHandler}
                      >
                        <IconTrash size={21} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table>
          </Collapse>
        </Box>
      ) : null}
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
    </Stack>
  );
}
