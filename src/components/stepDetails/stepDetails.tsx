import { Button, Group, Image, Tabs, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useNavigate, useParams } from "react-router-dom";
import CircleX from "../../assets/icons/circle_x.svg";
import { getStatusLabel } from "../../lib/helpers/getStatusLabel.ts";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { useServerName } from "../../lib/helpers/useServerName";
import { useProject } from "../../lib/operators/useProject";
import { useStep } from "../../lib/operators/useStep";
import { useTest } from "../../lib/operators/useTest";
import { useTestCase } from "../../lib/operators/useTestCase";
import { StatusEnum } from "../../types/schema";
import { CommentsList } from "../commentsList/CommentsList";
import { ContentHeader } from "../contentHeader/ContentHeader";
import { ChangeStatusFormValues } from "../modals/changeStatusModal/ChangeStatusModal.tsx";
import { Modals } from "../modals/modals.ts";
import { EditableHtmlText } from "../shared/EditableHtmlText";
import { SectionError } from "../shared/SectionError";
import { SectionLoading } from "../shared/SectionLoading";
import { StatusIcon } from "../statusIcon/StatusIcon.tsx";
import { StepSwitch } from "../stepSwitch/StepSwitch";
import { ClosestStepsButtons } from "./ClosestStepsButtons";
import classes from "./stepDetails.module.css";
import { StepLog } from "./StepLog";

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
    params.stepId,
  );

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
      step.data.id,
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
        params.testId,
      ),
    );
  };

  const onStatusChange = (status: StatusEnum) => {
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
  };

  const handleStatusChange =
    (status: StatusEnum) => (values: ChangeStatusFormValues) => {
      test.updateStepStatuses(
        [step.data.id],
        status,
        values.collaboratorId,
        values.notes,
      );
    };

  return (
    <div className={classes.stepDetails}>
      <div className={classes.backButton}>
        <Button
          variant="transparent"
          leftSection={<Image alt="Close" src={CircleX} />}
          p={0}
          onClick={closeStep}
        >
          <Text c={"black"}>Close</Text>
        </Button>
      </div>
      <ContentHeader
        status={step.data.status}
        title={step.data.title}
        handleDeleteClick={handleDeleteClick}
        handleQuickEdit={handleQuickEdit}
      />
      <div className={classes.description}>
        <EditableHtmlText
          name="description"
          onChange={(value) => {
            test.updateStep(
              {
                title: step.data.title,
                description: value,
              },
              step.data.id,
            );
          }}
          value={step.data.description}
        />
      </div>

      <div className={classes.stepSwitch}>
        <StepSwitch
          currentStatus={step.data.status}
          onChange={onStatusChange}
        />
      </div>

      <div className={classes.closestSteps}>
        <ClosestStepsButtons
          caseId={testCase.data?.id}
          projectId={project.data.id}
          stepId={step.data.id}
          steps={test.data?.steps}
          testId={test.data?.id}
        />
      </div>

      <div className={classes.comments}>
        {testCase.data && test.data && (
          <Tabs defaultValue="notes">
            <Tabs.List mb="md">
              <Tabs.Tab value="notes" className={classes.tab}>
                <Title order={4}>Notes</Title>
              </Tabs.Tab>
              <Tabs.Tab value="log" className={classes.tab}>
                <Title order={4}>Log</Title>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="notes" pt="xs">
              <CommentsList
                testId={test.data.id}
                stepId={step.data.id}
                comments={testCase.data.comments.filter(
                  (comment) => comment.stepId === step.data.id,
                )}
                createComment={testCase.createComment}
                removeComment={testCase.removeComment}
                updateCommentResolved={testCase.updateCommentResolved}
                updateCommentContent={testCase.updateCommentContent}
                showTitle={false}
              />
            </Tabs.Panel>
            <Tabs.Panel value="log" pt="xs">
              <StepLog project={project} stepId={step.data.id} />
            </Tabs.Panel>
          </Tabs>
        )}
      </div>
    </div>
  );
};
