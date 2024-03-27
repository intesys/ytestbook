import { Group, Progress, Table } from "@mantine/core";
import { useParams } from "react-router-dom";
import { parseTimestamp } from "../../../../lib/date/parseTimestamp";
import { useProject } from "../../../../lib/operators/useProject";
import { StatusIcon } from "../../../statusIcon/StatusIcon";
import classes from "./overview.module.scss";

export const Overview: React.FC = () => {
  const params = useParams();
  const project = useProject(params.projectId);

  return (
    <>
      <Table my={20} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Completion</Table.Th>
            <Table.Th>Tags</Table.Th>
            <Table.Th>Last edit</Table.Th>
            <Table.Th>Assignee</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className={classes.tbody}>
          {project.data?.testCases.map((testCase) => (
            <Table.Tr key={testCase.id}>
              <Table.Td>
                <Group>
                  <StatusIcon status={testCase.status} />
                  {testCase.title}
                </Group>
              </Table.Td>
              <Table.Td>
                <Progress radius="md" size="xl" value={50} color="green" />
              </Table.Td>
              <Table.Td>{"tags"}</Table.Td>
              <Table.Td>
                {testCase.lastUpdate ? parseTimestamp(testCase.lastUpdate) : ""}
              </Table.Td>
              <Table.Td>{"assignees"}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* <AddUseCase {...{ testbook, useCases }} /> */}
    </>
  );
};
