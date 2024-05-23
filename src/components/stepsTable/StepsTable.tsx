import { Button, Table, Text, ThemeIcon, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router";
import Delete from "../../assets/icons/delete.svg";
import { parseTimestamp } from "../../lib/date/parseTimestamp";
import { TUseTest } from "../../lib/operators/types";
import { TStep } from "../../schema";
import { SimpleNewElementForm } from "../shared/SimpleNewElementForm";
import { StatusButton } from "../statusButton/StatusButton";

export function StepsTable({
  steps,
  createStep,
  updateStepStatus,
  removeStep,
}: {
  steps: TStep[];
  createStep: TUseTest["createStep"];
  updateStepStatus: TUseTest["updateStepStatus"];
  removeStep: TUseTest["removeStep"];
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const createNewTest = (title: string) => {
    createStep({
      title,
    });
    close();
  };

  return (
    <>
      <Title order={4}>Steps</Title>
      {steps.length === 0 && !opened ? (
        <Text>The steps list is empty.</Text>
      ) : (
        <Table verticalSpacing={10} horizontalSpacing={20} withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Text fw={"bold"}>Status</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={"bold"}>Title</Text>
              </Table.Th>
              <Table.Th>
                <Text fw={"bold"}>Last update</Text>
              </Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {steps.map((step) => (
              <Table.Tr
                key={step.id}
                onClick={() => navigate(`step/${step.id}`, {})}
              >
                <Table.Td>
                  <StatusButton
                    step={step}
                    updateStepStatus={updateStepStatus}
                  />
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{step.title}</Text>
                </Table.Td>
                <Table.Td>
                  {step.lastUpdate ? parseTimestamp(step.lastUpdate) : "—"}
                </Table.Td>
                <Table.Td>
                  <Button
                    variant="transparent"
                    p={0}
                    onClick={() => removeStep(step.id)}
                  >
                    <img src={Delete} />
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
            {opened && (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <SimpleNewElementForm
                    onSubmit={createNewTest}
                    close={close}
                  />
                </Table.Td>
              </Table.Tr>
            )}
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
        Add step
      </Button>
    </>
  );
}
