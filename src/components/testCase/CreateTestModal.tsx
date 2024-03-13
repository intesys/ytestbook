import {
  Button,
  Container,
  Flex,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { TModalProps } from "../_home/types";
import { useForm } from "@mantine/form";
import { TTestDynamicData } from "../../schema";
import { TUseTestCase } from "../../lib/operators/useTestCase";

export function CreateTestModal({
  opened,
  close,
  createTest,
}: TModalProps & { createTest: TUseTestCase["createTest"] }) {
  const form = useForm<TTestDynamicData>({
    initialValues: {
      title: "",
      description: "",
    },
  });
  return (
    <Modal opened={opened} onClose={close} title="Add Test" centered size="xl">
      <Container>
        <form
          onSubmit={form.onSubmit((values) => {
            createTest(values);
            close();
          })}
        >
          <Flex direction="column" gap={16}>
            <TextInput
              withAsterisk
              label="Title"
              placeholder="My new test"
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Description"
              rows={10}
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
