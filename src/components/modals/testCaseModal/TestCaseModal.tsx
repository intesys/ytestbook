import { Button, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback } from "react";
import { TCaseDynamicData } from "../../../schema";
import { TModalProps } from "../../home/types";
import { RichTextarea } from "../../shared/RichTextarea";
import { FormErrorMessages } from "../../../lib/formErrors";

export function TestCaseModal({
  id,
  context,
  innerProps: { handleSubmit, id: caseId, initialValues },
}: ContextModalProps<TModalProps<TCaseDynamicData>>) {
  const form = useForm<TCaseDynamicData>({
    initialValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      jiraLink: initialValues?.jiraLink ?? "",
    },
    validate: {
      title: isNotEmpty(FormErrorMessages.required),
    },
  });

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: TCaseDynamicData) => {
      if (handleSubmit) {
        handleSubmit(values, caseId);
      }

      close();
    },
    [close, handleSubmit, caseId],
  );

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap="md">
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

        <TextInput label="Jira link URL" {...form.getInputProps("jiraLink")} />

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
