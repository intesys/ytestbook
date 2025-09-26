import { Button, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { TModalProps } from "@/components/repositories/types";
import { RichTextarea } from "@/components/shared/RichTextarea/RichTextarea";
import { FormErrorMessages } from "@/lib/formErrors";
import { TCaseDynamicData } from "@/types/schema";

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

  const close = () => context.closeModal(id);

  const handleFormSubmit = (values: TCaseDynamicData) => {
    if (handleSubmit) {
      handleSubmit(values, caseId);
    }

    close();
  };

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
