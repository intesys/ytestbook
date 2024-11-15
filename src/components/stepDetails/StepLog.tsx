import { ActionIcon, Button, Flex, Group, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconWindowMaximize } from "@tabler/icons-react";
import { getStatusLabel } from "../../lib/helpers/getStatusLabel";
import { TUseProject } from "../../lib/operators/types";
import { Avatars } from "../avatars/Avatars.tsx";
import { RelativeDate } from "../shared/relativeDate/RelativeDate";
import { StatusIcon } from "../statusIcon/StatusIcon";

type StepLogProps = {
  stepId: string;
  project: TUseProject;
};

const NOTES_LIMIT_LENGTH = 10;

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
                <Group align="center" gap={6} wrap="nowrap">
                  <StatusIcon status={status.previousStatus} />
                  <Text size="sm">{getStatusLabel(status.previousStatus)}</Text>
                </Group>
              </Table.Td>
              <Table.Td>
                <Group align="center" gap={6} wrap="nowrap">
                  <StatusIcon status={status.targetStatus} />
                  <Text size="sm">{getStatusLabel(status.targetStatus)}</Text>
                </Group>
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
                {status.notes ? (
                  status.notes.length > NOTES_LIMIT_LENGTH ? (
                    <Group gap={6} wrap="nowrap">
                      <Text size="sm" fs="italic">
                        {status.notes.substring(0, NOTES_LIMIT_LENGTH)}...
                      </Text>
                      <ActionIcon
                        size="sm"
                        variant="subtle"
                        onClick={() =>
                          modals.open({
                            title: "Notes",
                            centered: true,
                            children: (
                              <>
                                <Text>{status.notes}</Text>
                                <Flex justify="flex-end">
                                  <Button
                                    onClick={() => modals.closeAll()}
                                    mt="md"
                                  >
                                    Close
                                  </Button>
                                </Flex>
                              </>
                            ),
                          })
                        }
                      >
                        <IconWindowMaximize />
                      </ActionIcon>
                    </Group>
                  ) : (
                    status.notes
                  )
                ) : (
                  <Text size="sm" c="dimmed" fs="italic">
                    &mdash;
                  </Text>
                )}
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};
