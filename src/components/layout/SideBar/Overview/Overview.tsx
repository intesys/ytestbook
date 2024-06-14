import { Button, Table, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoMdAddCircle } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useProject } from "../../../../lib/operators/useProject";
import { SimpleNewElementForm } from "../../../shared/SimpleNewElementForm";
import { SIDEBAR_STATUS } from "../const";
import { TestCaseRow } from "./TestCaseRow";
import classes from "./overview.module.scss";

export const Overview: React.FC<{
  toggle: (value?: React.SetStateAction<SIDEBAR_STATUS> | undefined) => void;
}> = ({ toggle }) => {
  const params = useParams();
  const project = useProject(params.projectId);

  const [opened, { open, close }] = useDisclosure(false);

  const createNewTestCase = (title: string) => {
    project.createTestCase({
      title,
    });
    close();
  };

  const openSidebar = () => toggle(SIDEBAR_STATUS.OPEN);

  return (
    <>
      <Table verticalSpacing={10} horizontalSpacing={20} borderColor="#eaefff">
        <Table.Thead bg={"#eaefff"}>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Completion</Table.Th>
            <Table.Th className="mantine-visible-from-md">Tags</Table.Th>
            <Table.Th className="mantine-visible-from-md">Last update</Table.Th>
            <Table.Th className="mantine-visible-from-md">Assignees</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className={classes.tbody}>
          {project.data?.testCases.map((testCase) => (
            <TestCaseRow
              key={testCase.id}
              project={project}
              testCase={testCase}
              openSidebar={openSidebar}
            />
          ))}
          {opened && (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <SimpleNewElementForm
                  onSubmit={createNewTestCase}
                  close={close}
                />
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Button
        w={290}
        mt={20}
        justify="space-between"
        rightSection={
          <ThemeIcon color="black" variant="transparent">
            <IoMdAddCircle size="18px" />
          </ThemeIcon>
        }
        variant="light"
        c={"#9CA8D6"}
        bg={"white"}
        onClick={open}
      >
        Add
      </Button>
    </>
  );
};
