import {
  Button,
  Flex,
  Progress,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import { parseTimestamp } from "../../lib/date/parseTimestamp";
import { computeCompletion } from "../../lib/helpers/computeCompletion";
import { TUseTestCase } from "../../lib/operators/types";
import { TTest } from "../../schema";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { StatusMenu } from "../statusMenu/StatusMenu";
import { CreateTestModal } from "../testCase/CreateTestModal";

export function TestsTable({
  tests,
  createTest,
  updateTestStatus,
}: {
  tests: TTest[];
  createTest: TUseTestCase["createTest"];
  updateTestStatus: TUseTestCase["updateTestStatus"];
}) {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <CreateTestModal opened={opened} close={close} createTest={createTest} />
      <Title order={4}>Tests</Title>
      {tests.length === 0 ? (
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
              <Table.Th>
                <Text fw={"bold"}>Tags</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={"bold"}>Last update</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={"bold"}>Assignees</Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tests.map((test) => {
              const completion = computeCompletion(test.steps);
              return (
                <Table.Tr
                  key={test.id}
                  onClick={() => navigate(`test/${test.id}`, {})}
                >
                  <Table.Td>
                    <Flex gap={10} align={"center"}>
                      <StatusMenu
                        id={test.id}
                        target={
                          <Button
                            p={0}
                            variant="transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <StatusIcon status={test.status} />
                          </Button>
                        }
                        updateStatus={updateTestStatus}
                      />
                      <Text size="sm">{test.title}</Text>
                    </Flex>
                  </Table.Td>
                  <Table.Td>
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
                  </Table.Td>
                  <Table.Td>{test.tags}</Table.Td>
                  <Table.Td>
                    <Text size="sm">
                      {test.lastUpdate ? parseTimestamp(test.lastUpdate) : "—"}
                    </Text>
                  </Table.Td>
                  <Table.Td>{test.assignees}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      )}
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
    </>
  );
}
