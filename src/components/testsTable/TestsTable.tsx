import {
  Button,
  Flex,
  Group,
  Progress,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { computeCompletion } from "../../lib/helpers/computeCompletion";
import { routesHelper } from "../../lib/helpers/routesHelper.ts";
import { TUseTestCase } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject";
import { TTest } from "../../types/schema";
import { Avatars } from "../avatars/Avatars";
import { BulkAddButton } from "../shared/BulkAddButton/BulkAddButton.tsx";
import { RelativeDate } from "../shared/relativeDate/RelativeDate";
import { SimpleNewElementForm } from "../shared/SimpleNewElementForm";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { Tags } from "../tags/Tags";
import classes from "./testsTable.module.css";

export function TestsTable({
  tests,
  createTest,
}: {
  tests: TTest[];
  createTest: TUseTestCase["createTest"];
}) {
  const params = useParams();
  const project = useProject(params.projectId);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const createNewTest = useCallback(
    (title: string) => {
      createTest({
        title,
        assignees: [],
        tags: [],
        description: "",
      });
      close();
    },
    [close, createTest],
  );

  const bulkLoadHandler = useCallback(
    (values: string[]) => {
      values.forEach((value) => {
        createNewTest(value);
      });
    },
    [createNewTest],
  );

  return (
    <>
      <Title order={4}>Tests</Title>
      {tests.length === 0 && !opened ? (
        <Text>The tests list is empty.</Text>
      ) : (
        <Table verticalSpacing={10} horizontalSpacing={20} withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Text fw={"bold"}>Title</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={"bold"}>Completion</Text>
              </Table.Th>
              <Table.Th visibleFrom="sm">
                <Text fw={"bold"}>Tags</Text>
              </Table.Th>
              <Table.Th visibleFrom="sm">
                <Text fw={"bold"}>Last update</Text>
              </Table.Th>
              <Table.Th visibleFrom="sm">
                <Text fw={"bold"}>Assignees</Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tests.map((test) => {
              const completion = computeCompletion(test.steps);
              const tags = project.getTagsByTestId(test.id);
              const assignees = project.getAssigneesByTestId(test.id);
              return (
                <Table.Tr
                  className={classes.row}
                  key={test.id}
                  onClick={() =>
                    navigate(
                      routesHelper.testDetail(
                        params.serverName ?? "",
                        params.projectId ?? "",
                        params.caseId ?? "",
                        test.id ?? "",
                      ),
                      {},
                    )
                  }
                >
                  <Table.Td>
                    <Flex gap={10} align={"center"}>
                      <StatusIcon status={test.status} />
                      <Text size="sm">{test.title}</Text>
                    </Flex>
                  </Table.Td>
                  <Table.Td>
                    {test.steps.length > 0 ? (
                      <Flex direction={"column"}>
                        <Text size="sm" fw={"bold"}>
                          {completion}%
                        </Text>
                        <Progress
                          value={completion}
                          size="lg"
                          radius="lg"
                          color="#0DE1A5"
                        />
                      </Flex>
                    ) : (
                      <Text>—</Text>
                    )}
                  </Table.Td>
                  <Table.Td className="mantine-visible-from-sm">
                    <Tags tags={tags} />
                  </Table.Td>
                  <Table.Td className="mantine-visible-from-sm">
                    <Text size="sm">
                      {test.lastUpdate ? (
                        <RelativeDate timeStamp={test.lastUpdate} />
                      ) : (
                        "—"
                      )}
                    </Text>
                  </Table.Td>
                  <Table.Td className="mantine-visible-from-sm">
                    <Avatars collaborators={assignees} />
                  </Table.Td>
                </Table.Tr>
              );
            })}
            {opened && (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <SimpleNewElementForm
                    onSubmit={createNewTest}
                    close={close}
                    placeholder="Enter the new Test title"
                  />
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      )}
      <Group gap="md" wrap="nowrap">
        <Button
          w={290}
          justify="space-between"
          rightSection={
            <ThemeIcon color="black" variant="transparent">
              <IoMdAddCircle size="18px" />
            </ThemeIcon>
          }
          variant="default"
          onClick={open}
        >
          Add test
        </Button>
        <BulkAddButton title="Bulk Add Tests" onBulkLoad={bulkLoadHandler} />
      </Group>
    </>
  );
}
