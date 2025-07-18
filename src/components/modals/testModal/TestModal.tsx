import { Button, Group, MultiSelect, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback } from "react";
import { FormErrorMessages } from "../../../lib/formErrors";
import { TTestDynamicData } from "../../../types/schema";
import { TModalProps } from "../../repositories/types";
import { RichTextarea } from "../../shared/RichTextarea/RichTextarea";

type TTestModalForm = TTestDynamicData & {
  tags: string[];
  assignees: string[];
};

export function TestModal({
  id,
  context,
  innerProps: { handleSubmit, project, id: testId, initialValues },
}: ContextModalProps<TModalProps<TTestModalForm>>) {
  const form = useForm<
    TTestDynamicData & { tags: string[]; assignees: string[] }
  >({
    initialValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      tags: initialValues?.tags ?? [],
      assignees: initialValues?.assignees ?? [],
    },
    validate: {
      title: isNotEmpty(FormErrorMessages.required),
    },
  });

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: TTestModalForm) => {
      if (handleSubmit) {
        handleSubmit(values, testId);
      }

      close();
    },
    [close, handleSubmit, testId],
  );

  const assigneesChangeHandler = useCallback(
    (values: string[]) => form.setFieldValue("assignees", values),
    [form],
  );

  const tagsChangeHandler = useCallback(
    (values: string[]) => form.setFieldValue("tags", values),
    [form],
  );

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap={16}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="My new test"
          {...form.getInputProps("title")}
        />
        <RichTextarea
          label={"Description"}
          {...form.getInputProps("description")}
        />
        <MultiSelect
          label="Assignees"
          data={
            project?.data?.collaborators?.map((collaborator) => ({
              value: collaborator.id,
              label: collaborator.name,
            })) || []
          }
          value={form.values.assignees}
          onChange={assigneesChangeHandler}
        />
        <MultiSelect
          label="Tags"
          data={project?.data?.allTags || []}
          value={form.values.tags}
          onChange={tagsChangeHandler}
        />
        <Group justify="end" gap="md">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Confirm</Button>
        </Group>
      </Stack>
    </form>
  );
}
