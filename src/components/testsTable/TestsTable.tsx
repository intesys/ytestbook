import { Button, Flex, Progress, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router";
import StatusPending from "../../assets/icons/status_pending.svg";

import { TUseTestCase } from "../../lib/operators/types";
import { TTest } from "../../schema";
import { CreateTestModal } from "../testCase/CreateTestModal";
import { parseTimestamp } from "../../lib/date/parseTimestamp";

export function TestsTable({
  tests,
  createTest,
}: {
  tests: TTest[];
  createTest: TUseTestCase["createTest"];
}) {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <CreateTestModal opened={opened} close={close} createTest={createTest} />
      <Text fw={700} size="20px">
        Tests
      </Text>
      {tests.length === 0 ? (
        <Text>The tests list is empty.</Text>
      ) : (
        <Table verticalSpacing={10} horizontalSpacing={20} withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Completion</Table.Th>
              <Table.Th>Tags</Table.Th>
              <Table.Th>Last edit</Table.Th>
              <Table.Th>Assignes</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tests.map((item) => (
              <Table.Tr
                key={item.id}
                onClick={() => navigate(`test/${item.id}`, {})}
              >
                <Table.Td>
                  <Flex gap={10}>
                    <img src={StatusPending} height={24} width={24} />
                    <Text>{item.title}</Text>
                  </Flex>
                </Table.Td>
                <Table.Td>
                  <Flex direction={"column"}>
                    <Text>{item.completion}%</Text>
                    <Progress value={item.completion} size="lg" radius="lg" />
                  </Flex>
                </Table.Td>
                <Table.Td>{item.tags}</Table.Td>
                <Table.Td>
                  {item.lastUpdate ? parseTimestamp(item.lastUpdate) : "—"}
                </Table.Td>
                <Table.Td>{item.assignees}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
      <Button w={290} variant="default" onClick={open}>
        Add test
      </Button>
    </>
  );
}
