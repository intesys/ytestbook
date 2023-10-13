import { Group, Progress, Table } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAllUseCases } from "../../../../hooks/useAllUseCases";
import { AddUseCase } from "./AddUseCase";
import { StatusIcon } from "../../../shared/StatusIcon";
import classes from "./overview.module.scss";

export const Overview: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const useCases = useAllUseCases(testbook ?? "");

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
          {useCases.map((useCase) => (
            <Table.Tr key={useCase._id}>
              <Table.Td>
                <Group>
                  <StatusIcon status={useCase.status} />
                  {useCase.title}
                </Group>
              </Table.Td>
              <Table.Td>
                <Progress radius="md" size="xl" value={50} color="green" />
              </Table.Td>
              <Table.Td>{useCase.tags.join(" ")}</Table.Td>
              <Table.Td>{useCase.modified}</Table.Td>
              <Table.Td>{useCase.accountantId}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <AddUseCase {...{ testbook, useCases }} />
    </>
  );
};
