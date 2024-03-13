import { Flex, Table } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAllUseCases } from "../../../../hooks/useAllUseCases";
import { StatusIcon } from "../../../shared/StatusIcon";
import { CompetitionProgress } from "../../../shared/tableComponents/CompetitionProgress/CompetitionProgress";
import { LastEdit } from "../../../shared/tableComponents/LastEdit/LastEdit";
import { TableCheckbox } from "../../../shared/tableComponents/TableCheckbox/TableCheckbox";
import { TableName } from "../../../shared/tableComponents/TableName/TableName";
import { Tags } from "../../../shared/tableComponents/Tags/Tags";
import { AddUseCase } from "./AddUseCase";
import classes from "./overview.module.scss";

// const mockAvatarData = [
//   // { firstName: "Mike", surname: "Konan" },
//   // { firstName: "Pite", surname: "Pite" },
//   // {
//   //   firstName: "John",
//   //   surname: "Smitt",
//   // },
//   // { firstName: "Marie", surname: "Duglas" },
//   // { firstName: "Bob", surname: "Barclay" },
//   // { firstName: "Charlie", surname: "Limp" },
//   // { firstName: "Jess", surname: "Marsia" },
// ];

export const Overview: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const useCases = useAllUseCases(testbook ?? "");

  console.table({ testbook, testcase, test, step });

  return (
    <>
      {/*<div style={{ backgroundColor: "white", padding: "20px" }}>*/}
      {/*  <SearchInput placeholder="Search tag" />*/}
      {/*</div>*/}
      <Table my={20} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th></Table.Th>
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
              <Table.Td className={classes.checkboxTd}>
                <Flex align="center">
                  <TableCheckbox />
                </Flex>
              </Table.Td>
              <Table.Td className={classes.statusTd}>
                <Flex align="center">
                  <StatusIcon status={useCase.status} variant="transparent" />
                </Flex>
              </Table.Td>
              <Table.Td>
                <TableName id={useCase._id} title={useCase.title} />
              </Table.Td>
              <Table.Td>
                <CompetitionProgress currentValue={65} totalValue={100} />
              </Table.Td>
              <Table.Td>
                <Tags data={useCase.tags} />
              </Table.Td>
              <Table.Td>
                <LastEdit date={useCase.modified || useCase.created} />
              </Table.Td>
              <Table.Td>
                {/* <Avatars data={useCase.accountantId} /> */}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <AddUseCase {...{ testbook, useCases }} />
    </>
  );
};
