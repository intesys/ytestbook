import { Group, Menu, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { getStatusLabel } from "../../lib/helpers/getStatusLabel.ts";
import { TUseTest } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject.ts";
import { StatusEnum } from "../../types/schema";
import { ChangeStatusFormValues } from "../modals/changeStatusModal/ChangeStatusModal.tsx";
import { Modals } from "../modals/modals.ts";
import { StatusIcon } from "../statusIcon/StatusIcon";

type TProps = {
  id: string;
  target: ReactNode;
  updateStepStatus: TUseTest["updateStepStatus"];
};

export function StatusMenu({ id, target, updateStepStatus }: TProps) {
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
      updateStepStatus(id, status, values.collaboratorId, values.notes);
    };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>{target}</Menu.Target>
      <Menu.Dropdown>
        {Object.values(StatusEnum).map((status) => (
          <Menu.Item
            key={status}
            leftSection={
              <StatusIcon status={StatusEnum[status as StatusEnum]} />
            }
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(status);
            }}
          >
            <Text>{getStatusLabel(status)}</Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
