import { Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { getStatusLabel } from "../../lib/helpers/getStatusLabel.ts";
import { TUseTest } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject.ts";
import { StatusEnum, TStep } from "../../types/schema";
import { ChangeStatusFormValues } from "../modals/changeStatusModal/ChangeStatusModal.tsx";
import { Modals } from "../modals/modals.ts";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { StatusMenuDropdown } from "./StatusMenuDropdown.tsx";

type TProps = {
  id: string;
  step: TStep;
  target?: ReactNode;
  updateStepStatuses: TUseTest["updateStepStatuses"];
};

export function StatusMenu({ id, step, target, updateStepStatuses }: TProps) {
  const params = useParams();
  const project = useProject(params.projectId);

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
      updateStepStatuses([id], status, values.collaboratorId, values.notes);
    };

  return (
    <StatusMenuDropdown
      currentStatus={step.status}
      onSelect={onStatusChange}
      target={target}
    />
  );
}
