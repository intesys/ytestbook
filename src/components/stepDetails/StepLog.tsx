import { Group, Table, Text } from "@mantine/core";
import { useMemo } from "react";
import { USER_ANONYMOUS } from "../../lib/constants/generic.ts";
import { TUseProject } from "../../lib/operators/types";
import { Avatars } from "../avatars/Avatars.tsx";
import { RelativeDate } from "../shared/relativeDate/RelativeDate";
import { StatusIconWithLabel } from "../statusIcon/StatusIconWithLabel.tsx";
import { StepLogNotes } from "./StepLogNotes.tsx";

type StepLogProps = {
  stepId: string;
  project: TUseProject;
};

export const StepLog = ({ project, stepId }: StepLogProps) => {
  const statusChanges = project.getStatusChangesByStepId(stepId);
  const collaborators = useMemo(() => {
    return (project.data?.collaborators ?? [])?.concat(USER_ANONYMOUS);
  }, [project.data?.collaborators]);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Change Time</Table.Th>
          <Table.Th>Previous Status</Table.Th>
          <Table.Th>Target Status</Table.Th>
          <Table.Th>Assigned To</Table.Th>
          <Table.Th>Notes</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {statusChanges.map((status) => {
          const collaborator = collaborators.find(
            (collaborator) => collaborator.id === status.collaboratorId,
          );

          return (
            <Table.Tr key={status.id}>
              <Table.Td>
                <RelativeDate timeStamp={status.createdAt} />
              </Table.Td>
              <Table.Td>
                <StatusIconWithLabel
                  status={status.previousStatus}
                  align="center"
                  gap={6}
                  wrap="nowrap"
                  labelProps={{ size: "sm" }}
                />
              </Table.Td>
              <Table.Td>
                <StatusIconWithLabel
                  status={status.targetStatus}
                  align="center"
                  gap={6}
                  wrap="nowrap"
                  labelProps={{ size: "sm" }}
                />
              </Table.Td>
              <Table.Td>
                {collaborator ? (
                  <Group wrap="nowrap" gap="xs">
                    <Avatars
                      collaborators={[collaborator]}
                      avatarProps={{ size: "sm" }}
                    />
                    <Text size="sm" visibleFrom="sm">
                      {collaborator.name}
                    </Text>
                  </Group>
                ) : (
                  <Text size="sm" c="dimmed" fs="italic">
                    &mdash;
                  </Text>
                )}
              </Table.Td>
              <Table.Td>
                <StepLogNotes notes={status.notes} />
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};
