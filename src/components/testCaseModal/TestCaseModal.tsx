import {
  Button,
  Container,
  Flex,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TCaseDynamicData } from "../../schema";
import { TModalProps } from "../_home/types";
import { useEffect } from "react";

export function TestCaseModal({
  id: caseId,
  initialValues,
  title,
  opened,
  close,
  handleSubmit,
}: TModalProps<TCaseDynamicData>) {
  const form = useForm<TCaseDynamicData>({
    initialValues: initialValues || {
      title: "",
      jiraLink: "",
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
            caseId !== undefined
              ? handleSubmit(values, caseId)
              : handleSubmit(values);
            close();
          })}
        >
          <Flex direction="column" gap={16}>
            <TextInput
              withAsterisk
              label="Title"
              placeholder="My new test case"
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Description"
              rows={10}
              {...form.getInputProps("description")}
            />
            <TextInput
              label="Jira link URL"
              {...form.getInputProps("jiraLink")}
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
