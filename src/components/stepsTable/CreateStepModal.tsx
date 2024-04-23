import { Button, Container, Flex, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TUseTest } from "../../lib/operators/types";
import { TStepDynamicData } from "../../schema";

//TODO align this modal with the others
export function CreateStepModal({
  opened,
  close,
  createStep,
}: {
  opened: boolean;
  close: () => void;
  createStep: TUseTest["createStep"];
}) {
  const form = useForm<TStepDynamicData>({
    initialValues: {
      description: "",
    },
  });
  return (
    <Modal opened={opened} onClose={close} title="Add step" centered size="xl">
      <Container>
        <form
          onSubmit={form.onSubmit((values) => {
            createStep(values);
            form.reset();
            close();
          })}
        >
          <Flex direction="column" gap={16}>
            <TextInput
              withAsterisk
              label="Step description"
              placeholder="My new step"
              {...form.getInputProps("description")}
            />
          </Flex>

          <Flex justify="end" mt={16} gap={16}>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </Flex>
        </form>
      </Container>
    </Modal>
  );
}
