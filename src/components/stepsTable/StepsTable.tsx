import { Button, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ArrowDropdown from "../../assets/icons/arrow_drop_down.svg";
import Delete from "../../assets/icons/delete.svg";
import StatusDone from "../../assets/icons/status_done.svg";
import { parseTimestamp } from "../../lib/date/parseTimestamp";
import { TUseTest } from "../../lib/operators/types";
import { TSteps } from "../../schema";
import { CreateStepModal } from "./CreateStepModal";

export function StepsTable({
  steps,
  createStep,
  removeStep,
}: {
  steps: TSteps[];
  createStep: TUseTest["createStep"];
  removeStep: TUseTest["removeStep"];
}) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <CreateStepModal opened={opened} close={close} createStep={createStep} />
      <Text fw={700} size="20px">
        Steps
      </Text>
      {steps.length === 0 ? (
        <Text>The steps list is empty.</Text>
      ) : (
        <Table verticalSpacing={10} horizontalSpacing={20} withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Status</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Last edit</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {steps.map((step) => (
              <Table.Tr key={step.id}>
                <Table.Td>
                  <Button
                    variant="light"
                    color="lime"
                    h={45}
                    leftSection={
                      <img src={StatusDone} height={24} width={24} />
                    }
                    rightSection={
                      <img src={ArrowDropdown} height={24} width={24} />
                    }
                  >
                    <Text c={"#3C3C3C"} fw={500}>
                      Change
                    </Text>
                  </Button>
                </Table.Td>
                <Table.Td>
                  <Text>{step.description}</Text>
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
          </Table.Tbody>
        </Table>
      )}
      <Button w={290} variant="default" onClick={open}>
        Add step
      </Button>
    </>
  );
}
