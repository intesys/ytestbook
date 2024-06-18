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
import { FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdUnfoldLessDouble, MdUnfoldMoreDouble } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  checkAssigneeFilter,
  checkStatusFilter,
  checkTagsFilter,
  checkTextFilter,
} from "../../../../lib/filters/overviewFilters.ts";
import { useProject } from "../../../../lib/operators/useProject";
import { TCase, TStep, TTest } from "../../../../schema.ts";
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
    tagsFilter: [],
    assigneeFilter: null,
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<TOverviewFilters>(initialFilters);
  const [filteredTestCases, setFilteredTestCases] = useState<TCase[]>([]);

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

  const filterCases = (cases: TCase[], filters: TOverviewFilters) => {
    return cases.reduce((accCase: TCase[], nextCase: TCase) => {
      const tags = project.getTagsByCaseId(nextCase.id);
      const assignees = project.getAssigneesByCaseId(nextCase.id);

      const filteredTests = nextCase.tests.reduce(
        (accTest: TTest[], nextTest: TTest) => {
          const tags = project.getTagsByTestId(nextTest.id);
          const assignees = project.getAssigneesByTestId(nextTest.id);

          const filteredSteps = nextTest.steps.reduce(
            (accStep: TStep[], nextStep: TStep) => {
              // Find if each step is visible or filtered

              const textFilterPasses = checkTextFilter(
                nextStep,
                ["title", "description"],
                filters,
              );

              const statusFilterPasses = checkStatusFilter(
                nextStep,
                ["status"],
                filters,
              );

              const tagsFilterPasses = checkTagsFilter(tags, filters);
              const assigneeFilterPasses = checkAssigneeFilter(
                assignees,
                filters,
              );

              // if the filters are off, or the step is included by the filters
              if (
                textFilterPasses &&
                statusFilterPasses &&
                tagsFilterPasses &&
                assigneeFilterPasses
              ) {
                accStep.push(nextStep);
              }

              return accStep;
            },
            [],
          );

          // Find if each Test is visible or filtered

          const textFilterPasses = checkTextFilter(
            nextTest,
            ["title", "description"],
            filters,
          );

          const statusFilterPasses = checkStatusFilter(
            nextTest,
            ["status"],
            filters,
          );
          const tagsFilterPasses = checkTagsFilter(tags, filters);
          const assigneeFilterPasses = checkAssigneeFilter(assignees, filters);

          // if the filters are off, filteredSteps has at least 1 value, or the test is included by the filters
          if (
            filteredSteps.length > 0 ||
            (textFilterPasses &&
              statusFilterPasses &&
              tagsFilterPasses &&
              assigneeFilterPasses)
          ) {
            const filtered: TTest = { ...nextTest, steps: filteredSteps };
            accTest.push(filtered);
          }
          return accTest;
        },
        [],
      );

      // Find if each TestCase is visible or filtered
      const textFilterPasses = checkTextFilter(
        nextCase,
        ["title", "description"],
        filters,
      );

      const statusFilterPasses = checkStatusFilter(
        nextCase,
        ["status"],
        filters,
      );

      const tagsFilterPasses = checkTagsFilter(tags, filters);
      const assigneeFilterPasses = checkAssigneeFilter(assignees, filters);

      // if the filters are off, filteredTests has at least 1 value, or the testCase is included by the filters
      if (
        filteredTests.length > 0 ||
        (textFilterPasses &&
          statusFilterPasses &&
          tagsFilterPasses &&
          assigneeFilterPasses)
      ) {
        const filtered: TCase = { ...nextCase, tests: filteredTests };
        accCase.push(filtered);
      }
      return accCase;
    }, []);
  };

  useEffect(() => {
    const allTestCases = project.data?.testCases ?? [];

    const filteredTestCases = filterCases(allTestCases, filters);

    setFilteredTestCases(filteredTestCases);
  }, [project.data?.testCases, filters]);

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
        c="indigo.2"
        bg="white"
        onClick={open}
      >
        Add
      </Button>
    </Stack>
  );
};
