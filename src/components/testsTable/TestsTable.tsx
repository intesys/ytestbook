import {
  Badge,
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
import { useNavigate, useParams } from "react-router";
import { parseTimestamp } from "../../lib/date/parseTimestamp";
import { computeCompletion } from "../../lib/helpers/computeCompletion";
import { TUseTestCase } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject";
import { TTest } from "../../schema";
import { Avatars } from "../avatars/Avatars";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { StatusMenu } from "../statusMenu/StatusMenu";
import { TestModal } from "../testModal/TestModal";

export function TestsTable({
  tests,
  createTest,
  updateTestStatus,
}: {
  tests: TTest[];
  createTest: TUseTestCase["createTest"];
  updateTestStatus: TUseTestCase["updateTestStatus"];
}) {
  const params = useParams();
  const project = useProject(params.projectId);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <TestModal
        title="Add Test"
        opened={opened}
        close={close}
        handleSubmit={createTest}
      />
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
              const tags = project.getTagsByTestId(test.id);
              const assignees = project.getAssigneesByTestId(test.id);
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
                  <Table.Td>
                    <TruncatedTags tags={tags} />
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">
                      {test.lastUpdate ? parseTimestamp(test.lastUpdate) : "—"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Avatars assignees={assignees} />
                  </Table.Td>
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

function TruncatedTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return <Text>—</Text>;
  const firstTags = tags.slice(0, 2);
  return (
    <Flex gap={5}>
      {firstTags.map((tag) => (
        <Badge key={tag} color="#EBEEFB" size="sm">
          <Text size="sm" c={"black"} fw={"bold"} truncate="end">
            {tag}
          </Text>
        </Badge>
      ))}

      {tags.length > firstTags.length && (
        <Badge color="black" size="sm">
          +{tags.length - firstTags.length}
        </Badge>
      )}
    </Flex>
  );
}
