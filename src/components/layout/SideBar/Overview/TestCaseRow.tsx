import { Flex, Progress, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import { MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { computeCompletion } from "../../../../lib/helpers/computeCompletion";
import { routesHelper } from "../../../../lib/helpers/routesHelper";
import { useServerName } from "../../../../lib/helpers/useServerName";
import { TUseProject } from "../../../../lib/operators/types";
import { TCase, TStep } from "../../../../types/schema";
import { Avatars } from "../../../avatars/Avatars";
import { RelativeDate } from "../../../shared/relativeDate/RelativeDate";
import { StatusIcon } from "../../../statusIcon/StatusIcon";
import { Tags } from "../../../tags/Tags";
import { ExpandButton } from "./ExpandButton";
import classes from "./overview.module.css";
import { TestRow } from "./TestRow";

type TestCaseRowProps = {
  readonly testCase: TCase;
  readonly project: TUseProject;
  openSidebar: () => void;
  forceExpanded?: boolean;
};

export function TestCaseRow({
  testCase,
  project,
  openSidebar,
  forceExpanded = false,
}: TestCaseRowProps) {
  const serverName = useServerName();
  const allSteps = testCase.tests.reduce((acc, test) => {
    test.steps.forEach((step) => acc.push(step));
    return acc;
  }, [] as TStep[]);
  const completion = computeCompletion(allSteps);
  const tags = project.getTagsByCaseId(testCase.id);
  const assignees = project.getAssigneesByCaseId(testCase.id);
  const [opened, handlers] = useDisclosure(false);

  const navigate = useNavigate();

  const onExpandToggle = (e: MouseEvent) => {
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
        className={clsx(classes.row, classes.testCaseRow)}
        key={testCase.id}
        onClick={() => {
          navigate(
            routesHelper.testCaseDetail(
              serverName,
              project.data.id,
              testCase.id,
            ),
          );
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
        <Table.Td visibleFrom="md">
          <Tags tags={tags} />
        </Table.Td>
        <Table.Td visibleFrom="md">
          {testCase.lastUpdate ? (
            <RelativeDate timeStamp={testCase.lastUpdate} />
          ) : (
            ""
          )}
        </Table.Td>
        <Table.Td visibleFrom="md">
          <Avatars collaborators={assignees} />
        </Table.Td>
      </Table.Tr>

      {opened
        ? testCase.tests.map((test) => (
            <TestRow
              key={test.id}
              openSidebar={openSidebar}
              project={project}
              test={test}
              forceExpanded={forceExpanded}
            />
          ))
        : null}
    </>
  );
}
