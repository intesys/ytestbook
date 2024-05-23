import { Flex, Progress, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router";
import { parseTimestamp } from "../../../../lib/date/parseTimestamp";
import { computeCompletion } from "../../../../lib/helpers/computeCompletion";
import { routesHelper } from "../../../../lib/helpers/routesHelper";
import { TUseProject } from "../../../../lib/operators/types";
import { TCase, TStep } from "../../../../schema";
import { Avatars } from "../../../avatars/Avatars";
import { StatusIcon } from "../../../statusIcon/StatusIcon";
import { Tags } from "../../../tags/Tags";
import { ExpandButton } from "./ExpandButton";
import { TestRow } from "./TestRow";

type TestCaseRowProps = {
  readonly testCase: TCase;
  readonly project: TUseProject;
  openSidebar: () => void;
};

export function TestCaseRow({
  testCase,
  project,
  openSidebar,
}: TestCaseRowProps) {
  const allSteps = testCase.tests.reduce((acc, test) => {
    test.steps.forEach((step) => acc.push(step));
    return acc;
  }, [] as TStep[]);
  const completion = computeCompletion(allSteps);
  const tags = project.getTagsByCaseId(testCase.id);
  const assignees = project.getAssigneesByCaseId(testCase.id);
  const [opened, handlers] = useDisclosure(false);

  const navigate = useNavigate();

  const onExpandToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    handlers.toggle();
  };

  if (!project.data?.id) {
    return null;
  }

  return (
    <>
      <Table.Tr
        key={testCase.id}
        onClick={() => {
          navigate(routesHelper.testCaseDetail(project.data.id, testCase.id));
          openSidebar();
        }}
      >
        <Table.Td onClick={onExpandToggle} w={60}>
          {testCase.tests.length > 0 ? <ExpandButton opened={opened} /> : null}
        </Table.Td>
        <Table.Td>
          <Flex gap={10} align={"center"} mih={54}>
            <StatusIcon status={testCase.status} />
            <Text size="sm">{testCase.title}</Text>
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
          <Tags tags={tags} />
        </Table.Td>
        <Table.Td>
          {testCase.lastUpdate ? parseTimestamp(testCase.lastUpdate) : ""}
        </Table.Td>
        <Table.Td>
          <Avatars assignees={assignees} />
        </Table.Td>
      </Table.Tr>

      {opened
        ? testCase.tests.map((test) => (
            <TestRow
              key={test.id}
              openSidebar={openSidebar}
              project={project}
              test={test}
            />
          ))
        : null}
    </>
  );
}
