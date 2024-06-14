import { Button, Group, Stack, Table, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdUnfoldLessDouble, MdUnfoldMoreDouble } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useProject } from "../../../../lib/operators/useProject";
import { TCase } from "../../../../schema.ts";
import { SimpleNewElementForm } from "../../../shared/SimpleNewElementForm";
import { SIDEBAR_STATUS } from "../const";
import classes from "./overview.module.scss";
import { OverviewFilters, TOverviewFilters } from "./OverviewFilters.tsx";
import { TestCaseRow } from "./TestCaseRow";

export const Overview: FC<{
  toggle: (value?: SetStateAction<SIDEBAR_STATUS> | undefined) => void;
}> = ({ toggle }) => {
  const params = useParams();
  const project = useProject(params.projectId);

  const initialFilters: TOverviewFilters = {
    textFilter: "",
    statusFilter: [],
    tagsFilter: ["UI"],
    assigneeFilter: null,
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<TOverviewFilters>(initialFilters);
  const [filteredTestCases, setFilteredTestCases] = useState<TCase[]>([]);

  const createNewTestCase = (title: string) => {
    project.createTestCase({
      title,
    });
    close();
  };

  const openSidebar = () => toggle(SIDEBAR_STATUS.OPEN);

  const expandCollapseClick = useCallback(() => {
    setExpanded((expanded) => !expanded);
  }, [setExpanded]);

  useEffect(() => {
    setFilteredTestCases(project.data?.testCases ?? []);
  }, [project.data?.testCases]);

  return (
    <Stack gap={20}>
      <Group justify="space-between" align="center">
        <OverviewFilters filters={filters} setFilters={setFilters} />
        <Button
          leftSection={
            expanded ? (
              <MdUnfoldLessDouble size={20} />
            ) : (
              <MdUnfoldMoreDouble size={20} />
            )
          }
          variant="subtle"
          color="dark"
          onClick={expandCollapseClick}
        >
          {expanded ? "Collapse all" : "Expand all"}
        </Button>
      </Group>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
      <Table
        verticalSpacing={10}
        horizontalSpacing={20}
        borderColor="#eaefff"
        mt={25}
      >
        <Table.Thead bg={"#eaefff"}>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Completion</Table.Th>
            <Table.Th visibleFrom="md">Tags</Table.Th>
            <Table.Th visibleFrom="md">Last update</Table.Th>
            <Table.Th visibleFrom="md">Assignees</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className={classes.tbody}>
          {filteredTestCases.map((testCase) => (
            <TestCaseRow
              key={testCase.id}
              project={project}
              testCase={testCase}
              openSidebar={openSidebar}
              forceExpanded={expanded}
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
    </Stack>
  );
};
