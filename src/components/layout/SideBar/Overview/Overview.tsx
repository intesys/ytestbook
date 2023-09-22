import { Group, Progress, Table } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAllUseCases } from "../../../../hooks/useAllUseCases";
import { AddUseCase } from "./AddUseCase";
import { StatusIcon } from "../../../misc/StatusIcon";
import { useTableStyles } from "./styles";

export const Overview: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const useCases = useAllUseCases(testbook ?? "");
  const tableStyles = useTableStyles();

  return (
    <>
      <Table my={20} verticalSpacing="md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Completion</th>
            <th>Tags</th>
            <th>Last edit</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody className={tableStyles.classes.tbody}>
          {useCases.map((useCase) => (
            <tr key={useCase._id}>
              <td>
                <Group>
                  <StatusIcon status={useCase.status} />
                  {useCase.title}
                </Group>
              </td>
              <td>
                <Progress radius="md" size="xl" value={50} color="green" />
              </td>
              <td>{useCase.tags.join(" ")}</td>
              <td>{useCase.modified}</td>
              <td>{useCase.accountantId}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddUseCase {...{ testbook, useCases }} />
    </>
  );
};
