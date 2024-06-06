import { Center, Table } from "@mantine/core";
import { TUseProject } from "../../lib/operators/types";
import { RelativeDate } from "../relativeDate/RelativeDate";
import { StatusIcon } from "../statusIcon/StatusIcon";

type StepLogProps = {
  stepId: string;
  project: TUseProject;
};

export const StepLog = ({ project, stepId }: StepLogProps) => {
  const statusChanges = project.getStatusChangesByStepId(stepId);
  console.log("🚀 ~ StepLog ~ statusChanges:", statusChanges);

  return (
    <Table>
      <Table.Thead>
        <Table.Th>Change Time</Table.Th>
        <Table.Th>
          <Center> Previous Status</Center>
        </Table.Th>
        <Table.Th>
          <Center>Target Status</Center>
        </Table.Th>
      </Table.Thead>
      <Table.Tbody>
        {statusChanges.map((status) => (
          <Table.Tr key={status.id}>
            <Table.Td>
              <RelativeDate timeStamp={status.createdAt} />
            </Table.Td>
            <Table.Td align="center">
              <StatusIcon status={status.previousStatus} />
            </Table.Td>
            <Table.Td align="center">
              <StatusIcon status={status.targetStatus} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
