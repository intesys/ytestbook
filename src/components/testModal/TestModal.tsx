import {
  Button,
  Container,
  Flex,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { TTestDynamicData } from "../../schema";
import { TModalProps } from "../_home/types";

export function TestModal({
  id: testId,
  initialValues,
  title,
  opened,
  close,
  handleSubmit,
}: TModalProps<TTestDynamicData>) {
  const form = useForm<TTestDynamicData>({
    initialValues: initialValues || {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialValues) form.setValues(initialValues);
  }, [initialValues]);

  return (
    <Modal opened={opened} onClose={close} title={title} centered size="xl">
      <Container>
        <form
          onSubmit={form.onSubmit((values) => {
            form.reset();
            testId !== undefined
              ? handleSubmit(values, testId)
              : handleSubmit(values);
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
