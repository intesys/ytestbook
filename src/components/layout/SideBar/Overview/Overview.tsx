import {
  Anchor,
  Button,
  Group,
  Stack,
  Table,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCactus } from "@tabler/icons-react";
import { FC, SetStateAction, useCallback, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdUnfoldLessDouble, MdUnfoldMoreDouble } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useOverviewFilters } from "../../../../lib/filters/useOverviewFilters.ts";
import { useProject } from "../../../../lib/operators/useProject";
import { BulkAddButton } from "../../../shared/BulkAddButton/BulkAddButton.tsx";
import { SimpleNewElementForm } from "../../../shared/SimpleNewElementForm";
import { SIDEBAR_STATUS } from "../const";
import classes from "./overview.module.css";
import { OverviewFilters } from "./OverviewFilters.tsx";
import { TestCaseRow } from "./TestCaseRow";

export const Overview: FC<{
  toggle: (value?: SetStateAction<SIDEBAR_STATUS> | undefined) => void;
}> = ({ toggle }) => {
  const params = useParams();
  const project = useProject(params.projectId);
  const { filters, setFilters, filteredTestCases } = useOverviewFilters(
    project.data?.testCases ?? [],
  );

  const [opened, { open, close }] = useDisclosure(false);
  const [expanded, setExpanded] = useState(false);

  const emptyItem = (
    <Stack justify="center" align="center" py="xl">
      <Text span c="dimmed">
        <IconCactus size={60} color="currentColor" />
      </Text>
      <Stack gap="xs" justify="center" align="center">
        <Text span fw="bold" ta="center">
          Nothing here!
        </Text>
        <Text span ta="center">
          There are no test cases to show! <br />
          Do you want to <Anchor onClick={open}>create a new one</Anchor> or are
          you maybe filtering too much?
        </Text>
      </Stack>
    </Stack>
  );

  const createNewTestCase = useCallback(
    (title: string) => {
      project.createTestCase({
        title,
      });
      close();
    },
    [close, project],
  );

  const openSidebar = () => toggle(SIDEBAR_STATUS.OPEN);

  const expandCollapseClick = useCallback(() => {
    setExpanded((expanded) => !expanded);
  }, [setExpanded]);

  const bulkLoadHandler = useCallback(
    (values: string[]) => {
      values.forEach((value) => {
        createNewTestCase(value);
      });
    },
    [createNewTestCase],
  );

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
      <Table
        verticalSpacing={10}
        horizontalSpacing={20}
        borderColor="#eaefff"
        mt={25}
      >
        <Table.Thead className={classes.thead}>
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
          {filteredTestCases.length > 0 ? (
            filteredTestCases.map((testCase) => (
              <TestCaseRow
                key={testCase.id}
                project={project}
                testCase={testCase}
                openSidebar={openSidebar}
                forceExpanded={expanded}
              />
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={6}>{emptyItem}</Table.Td>
            </Table.Tr>
          )}
          {opened && (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <SimpleNewElementForm
                  onSubmit={createNewTestCase}
                  close={close}
                  placeholder="Enter the new Test Case title"
                />
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Group gap="md" wrap="nowrap">
        <Button
          w={290}
          justify="space-between"
          rightSection={
            <ThemeIcon color="black" variant="transparent">
              <IoMdAddCircle size="18px" />
            </ThemeIcon>
          }
          variant="light"
          c="indigo.2"
          bg="white"
          onClick={open}
        >
          Add Test Case
        </Button>
        <BulkAddButton
          title="Bulk add Test Cases"
          onBulkLoad={bulkLoadHandler}
        />
      </Group>
    </Stack>
  );
};
