import { Box, Group, Table, Title } from "@mantine/core";
import { TUseProject } from "../../../lib/operators/types";
import { StatusIconWithLabel } from "../../statusIcon/StatusIconWithLabel";

type PlainProps = {
  project: TUseProject;
};

export const Plain = ({ project }: PlainProps) => {
  const testCases = project.data?.testCases;

  return (
    <>
      <Title order={3}>{project.data?.title} - Plain Report</Title>

      {testCases?.length === 0 ? (
        <Title order={5}>No test cases found</Title>
      ) : (
        testCases?.map((testCase) => (
          <>
            <div key={testCase.id}>
              <Title order={4}>
                <Group gap={"md"}>
                  {testCase.title}
                  <Box flex={1}>
                    <StatusIconWithLabel status={testCase.status} />
                  </Box>
                </Group>
              </Title>
            </div>

            <Table>
              <Table.Thead>
                <Table.Th>Test</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Thead>
              {testCase.tests.map((test) => (
                <Table.Tr key={test.id}>
                  <Table.Td>{test.title}</Table.Td>
                  <Table.Td>
                    <StatusIconWithLabel status={test.status} />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table>
          </>
        ))
      )}
    </>
  );
};
