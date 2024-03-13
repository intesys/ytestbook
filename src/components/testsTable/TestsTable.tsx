import { Table, Flex, Text, Button } from "@mantine/core";
import { TTest } from "../../schema";
import StatusPending from "../../assets/icons/status_pending.svg";
import { useDisclosure } from "@mantine/hooks";
import { CreateTestModal } from "../testCase/CreateTestModal";
import { TUseTestCase } from "../../lib/operators/useTestCase";

export function TestsTable({
  tests,
  createTest,
}: {
  tests: TTest[];
  createTest: TUseTestCase["createTest"];
}) {
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
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Flex gap={10}>
                    <img src={StatusPending} height={24} width={24} />
                    <Text>{item.title}</Text>
                  </Flex>
                </Table.Td>
                <Table.Td>{item.completion}</Table.Td>
                <Table.Td>{item.tags}</Table.Td>
                <Table.Td>{item.lastUpdate}</Table.Td>
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
