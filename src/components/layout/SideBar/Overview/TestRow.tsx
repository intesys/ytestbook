import { Flex, Progress, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router";
import { parseTimestamp } from "../../../../lib/date/parseTimestamp";
import { computeCompletion } from "../../../../lib/helpers/computeCompletion";
import { routesHelper } from "../../../../lib/helpers/routesHelper";
import { TUseProject } from "../../../../lib/operators/types";
import { TTest } from "../../../../schema";
import { Avatars } from "../../../avatars/Avatars";
import { StatusIcon } from "../../../statusIcon/StatusIcon";
import { Tags } from "../../../tags/Tags";
import { ExpandButton } from "./ExpandButton";
import { StepRow } from "./StepRow";

type TestRowProps = {
  readonly project: TUseProject;
  readonly test: TTest;
  openSidebar: () => void;
};

export const TestRow = ({ openSidebar, project, test }: TestRowProps) => {
  const completion = computeCompletion(test.steps);
  const tags = project.getTagsByTestId(test.id);
  const assignees = project.getAssigneesByTestId(test.id);
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
        onClick={() => {
          navigate(
            routesHelper.testDetail(project.data.id, test.caseId, test.id),
          );
          openSidebar();
        }}
        bg="#E4E9FFCC"
      >
        <Table.Td onClick={onExpandToggle}>
          {test.steps.length > 0 ? <ExpandButton opened={opened} /> : null}
        </Table.Td>
        <Table.Td>
          <Flex gap={10} align={"center"} mih={54}>
            <StatusIcon status={test.status} />
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
          <Tags tags={tags} />
        </Table.Td>
        <Table.Td>
          {test.lastUpdate ? parseTimestamp(test.lastUpdate) : ""}
        </Table.Td>
        <Table.Td>
          <Avatars assignees={assignees} />
        </Table.Td>
      </Table.Tr>

      {opened
        ? test.steps.map((step) => (
            <StepRow
              key={step.id}
              caseId={test.caseId}
              openSidebar={openSidebar}
              project={project}
              step={step}
            />
          ))
        : null}
    </>
  );
};
