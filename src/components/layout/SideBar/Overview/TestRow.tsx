import { Flex, Progress, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { computeCompletion } from "../../../../lib/helpers/computeCompletion";
import { routesHelper } from "../../../../lib/helpers/routesHelper";
import { useServerName } from "../../../../lib/helpers/useServerName";
import { TUseProject } from "../../../../lib/operators/types";
import { TTest } from "../../../../types/schema";
import { Avatars } from "../../../avatars/Avatars";
import { RelativeDate } from "../../../shared/relativeDate/RelativeDate";
import { StatusIcon } from "../../../statusIcon/StatusIcon";
import { Tags } from "../../../tags/Tags";
import { ExpandButton } from "./ExpandButton";
import classes from "./overview.module.css";
import { StepRow } from "./StepRow";

type TestRowProps = {
  readonly project: TUseProject;
  readonly test: TTest;
  openSidebar: () => void;
  forceExpanded?: boolean;
};

export const TestRow = ({
  openSidebar,
  project,
  test,
  forceExpanded = false,
}: TestRowProps) => {
  const serverName = useServerName();
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

  useEffect(() => {
    if (forceExpanded) {
      handlers.open();
    } else {
      handlers.close();
    }
  }, [forceExpanded]);

  if (!project.data?.id) {
    return null;
  }

  return (
    <>
      <Table.Tr
        className={clsx(classes.row, classes.testRow)}
        onClick={() => {
          navigate(
            routesHelper.testDetail(
              serverName,
              project.data.id,
              test.caseId,
              test.id,
            ),
          );
          openSidebar();
        }}
      >
        <Table.Td onClick={onExpandToggle} w={60}>
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
        <Table.Td visibleFrom="md">
          <Tags tags={tags} />
        </Table.Td>
        <Table.Td visibleFrom="md">
          {test.lastUpdate ? <RelativeDate timeStamp={test.lastUpdate} /> : ""}
        </Table.Td>
        <Table.Td visibleFrom="md">
          <Avatars collaborators={assignees} />
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
