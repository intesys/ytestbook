import { Button, Flex, Progress, Table, Text, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { parseTimestamp } from "../../../../lib/date/parseTimestamp";
import { computeCompletion } from "../../../../lib/helpers/computeCompletion";
import { useProject } from "../../../../lib/operators/useProject";
import { TStep } from "../../../../schema";
import { Avatars } from "../../../avatars/Avatars";
import { SimpleNewElementForm } from "../../../shared/SimpleNewElementForm";
import { StatusIcon } from "../../../statusIcon/StatusIcon";
import { Tags } from "../../../tags/Tags";
import { SIDEBAR_STATUS } from "../const";
import classes from "./overview.module.scss";

export const Overview: React.FC<{
  toggle: (value?: React.SetStateAction<SIDEBAR_STATUS> | undefined) => void;
}> = ({ toggle }) => {
  const params = useParams();
  const project = useProject(params.projectId);
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const createNewTestCase = (title: string) => {
    project.createTestCase({
      title,
    });
    close();
  };

  return (
    <>
      <Table verticalSpacing={10} horizontalSpacing={20} borderColor="#eaefff">
        <Table.Thead bg={"#eaefff"}>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Completion</Table.Th>
            <Table.Th>Tags</Table.Th>
            <Table.Th>Last update</Table.Th>
            <Table.Th>Assignees</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className={classes.tbody}>
          {project.data?.testCases.map((testCase) => {
            const allSteps = testCase.tests.reduce((acc, test) => {
              test.steps.forEach((step) => acc.push(step));
              return acc;
            }, [] as TStep[]);
            const completion = computeCompletion(allSteps);
            const tags = project.getTagsByCaseId(testCase.id);
            const assignees = project.getAssigneesByCaseId(testCase.id);
            return (
              <Table.Tr
                key={testCase.id}
                onClick={() => {
                  navigate(
                    `/project/${project.data.id}/testCase/${testCase.id}`,
                  );
                  toggle(SIDEBAR_STATUS.OPEN);
                }}
              >
                <Table.Td>
                  <Flex gap={10} align={"center"}>
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
                  {testCase.lastUpdate
                    ? parseTimestamp(testCase.lastUpdate)
                    : ""}
                </Table.Td>
                <Table.Td>
                  <Avatars assignees={assignees} />
                </Table.Td>
              </Table.Tr>
            );
          })}
          {opened && (
            <Table.Tr>
              <Table.Td colSpan={5}>
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
        mt={20}
        justify="space-between"
        rightSection={
          <ThemeIcon color="black" variant="transparent">
            <IoMdAddCircle size="18px" />
          </ThemeIcon>
        }
        variant="light"
        c={"#9CA8D6"}
        bg={"white"}
        onClick={open}
      >
        Add
      </Button>
    </>
  );
};
