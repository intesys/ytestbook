import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, Group, Image, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import CircleX from "@/assets/icons/circle_x.svg";
import { ContentHeader } from "@/components/contentHeader/ContentHeader";
import { ContentWrapper } from "@/components/layout/ContentWrapper/ContentWrapper.tsx";
import { ChangeStatusFormValues } from "@/components/modals/changeStatusModal/ChangeStatusModal.tsx";
import { Modals } from "@/components/modals/modals.ts";
import { EditableHtmlText } from "@/components/shared/EditableHtmlText";
import { SectionError } from "@/components/shared/SectionError";
import { SectionLoading } from "@/components/shared/SectionLoading";
import { StatusIcon } from "@/components/statusIcon/StatusIcon.tsx";
import { StepSwitch } from "@/components/stepSwitch/StepSwitch";
import { StepTimeline } from "@/components/StepTimeline/StepTimeline.tsx";
import {
  ActivityType,
  StepTimelineComment,
  StepTimelineItem,
  StepTimelineStatusUpdate,
} from "@/components/StepTimeline/stepTimeline.types.ts";
import { getStatusLabel } from "@/lib/helpers/getStatusLabel.ts";
import { routesHelper } from "@/lib/helpers/routesHelper";
import { useServerName } from "@/lib/helpers/useServerName";
import { useProject } from "@/lib/operators/useProject";
import { useStep } from "@/lib/operators/useStep";
import { useTest } from "@/lib/operators/useTest";
import { useTestCase } from "@/lib/operators/useTestCase";
import { StatusEnum } from "@/types/schema";
import { ClosestStepsButtons } from "./ClosestStepsButtons";
import classes from "./stepDetails.module.css";

export const StepDetails = () => {
  const navigate = useNavigate();
  const serverName = useServerName();
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);
  const test = useTest(params.projectId, params.caseId, params.testId);
  const step = useStep(
    params.projectId,
    params.caseId,
    params.testId,
    params.stepId
  );

  const projectSettings = useMemo(() => project.getSettings(), [project]);

  const comments: StepTimelineComment[] = useMemo(
    () =>
      testCase?.data?.comments
        .filter((comment) => comment.stepId === step?.data?.id)
        .map((comment) => ({
          comment,
          type: comment.resolved
            ? ActivityType.Comment
            : ActivityType.UnsolvedComment,
          date: comment.createdAt,
        })) ?? [],
    [step?.data?.id, testCase?.data?.comments]
  );

  const statusChanges: StepTimelineStatusUpdate[] = useMemo(
    () =>
      project
        .getStatusChangesByStepId(step?.data?.id ?? "")
        .map((statusUpdate) => ({
          statusUpdate,
          type: ActivityType.StatusUpdate,
          date: statusUpdate.createdAt,
        })) ?? [],
    [project, step?.data?.id]
  );

  const list: StepTimelineItem[] = useMemo(() => {
    return [...(comments ?? []), ...(statusChanges ?? [])];
  }, [comments, statusChanges]);

  if (step.loading || project.loading || testCase.loading || test.loading) {
    return <SectionLoading />;
  }

  if (step.error || project.error || testCase.error || test.error) {
    return <SectionError />;
  }

  const handleQuickEdit = (title: string) => {
    test.updateStep(
      {
        title,
      },
      step.data.id
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
      routesHelper.testDetail(
        serverName,
        params.projectId,
        params.caseId,
        params.testId
      )
    );
  };

  const onStatusChange = (status: StatusEnum) => {
    if (projectSettings?.enableUpdateStatusDialog === true) {
      modals.openContextModal({
        modal: Modals.ChangeStatusModal,
        title: (
          <Group wrap="nowrap" gap={6}>
            Update Status to{" "}
            <Group gap={6} wrap="nowrap">
              <StatusIcon status={status} showTooltip={false} />
              <Text span>{getStatusLabel(status)}</Text>
            </Group>
          </Group>
        ),
        centered: true,
        innerProps: {
          project,
          handleSubmit: handleStatusChange(status),
        },
      });
    } else {
      // just update the status without asking for more info
      test.updateStepStatuses([step.data.id], status);
    }
  };

  const handleStatusChange =
    (status: StatusEnum) => (values: ChangeStatusFormValues) => {
      test.updateStepStatuses(
        [step.data.id],
        status,
        values.collaboratorId,
        values.notes
      );
    };

  return (
    <ContentWrapper>
      <Box className={classes.stepDetails}>
        <Box className={classes.backButton}>
          <Button
            variant="transparent"
            leftSection={<Image alt="Close" src={CircleX} />}
            p={0}
            onClick={closeStep}
          >
            <Text c={"black"}>Close</Text>
          </Button>
        </Box>
        <ContentHeader
          status={step.data.status}
          title={step.data.title}
          handleDeleteClick={handleDeleteClick}
          handleQuickEdit={handleQuickEdit}
        />
        <Box className={classes.description}>
          <EditableHtmlText
            name="description"
            onChange={(value) => {
              test.updateStep(
                {
                  title: step.data.title,
                  description: value,
                },
                step.data.id
              );
            }}
            value={step.data.description}
          />
        </Box>

        <Box className={classes.stepSwitch}>
          <StepSwitch
            currentStatus={step.data.status}
            onChange={onStatusChange}
          />
        </Box>

        <Box className={classes.closestSteps}>
          <ClosestStepsButtons
            caseId={testCase.data?.id}
            projectId={project.data.id}
            stepId={step.data.id}
            steps={test.data?.steps}
            testId={test.data?.id}
          />
        </Box>

        {testCase.data && test.data ? (
          <Box className={classes.comments}>
            <StepTimeline
              list={list}
              project={project}
              testId={test.data.id}
              stepId={step.data.id}
              createComment={testCase.createComment}
              removeComment={testCase.removeComment}
              updateCommentResolved={testCase.updateCommentResolved}
              updateCommentContent={testCase.updateCommentContent}
            />
          </Box>
        ) : null}
      </Box>
    </ContentWrapper>
  );
};
