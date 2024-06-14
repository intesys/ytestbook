import { Text, Group, Table } from "@mantine/core";
import { TUseProject } from "../../lib/operators/types";
import { RelativeDate } from "../relativeDate/RelativeDate";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { getStatusLabel } from "../../lib/helpers/getStatusLabel";

type StepLogProps = {
  stepId: string;
  project: TUseProject;
};

export const StepLog = ({ project, stepId }: StepLogProps) => {
  const statusChanges = project.getStatusChangesByStepId(stepId);

  return (
    <Table>
      <Table.Thead>
        <Table.Th>Change Time</Table.Th>
        <Table.Th>Previous Status</Table.Th>
        <Table.Th>Target Status</Table.Th>
      </Table.Thead>
      <Table.Tbody>
        {statusChanges.map((status) => (
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
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
