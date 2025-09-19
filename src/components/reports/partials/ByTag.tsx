import { Table, Title } from "@mantine/core";
import { StatusIconWithLabel } from "@/components/statusIcon/StatusIconWithLabel";
import { TUseProject } from "@/lib/operators/types";

type PlainProps = {
  project: TUseProject;
};

export const ByTag = ({ project }: PlainProps) => {
  const tagToTest = project.data?.tagToTest;
  const groupedTags = project.getTestsByTags();

  return (
    <>
      <Title order={3}>{project.data?.title} - Plain Report</Title>

      {tagToTest?.length === 0 ? (
        <Title order={5}>No tags found</Title>
      ) : (
        Object.entries(groupedTags).map((tagToTest) => {
          const [tag, tests] = tagToTest;

          return (
            <>
              <div key={tag}>
                <Title order={4}>{tag}</Title>
              </div>

              <Table>
                <Table.Thead>
                  <Table.Th>Test</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Thead>
                <Table.Tbody>
                  {tests.map((test) => (
                    <Table.Tr key={test.id}>
                      <Table.Td>{test.title}</Table.Td>
                      <Table.Td>
                        <StatusIconWithLabel status={test.status} />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </>
          );
        })
      )}
    </>
  );
};
