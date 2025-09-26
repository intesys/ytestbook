import { Button, Checkbox, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";

export type ResetProjectModalFormValues = {
  removeChangelogs: boolean;
  removeNotes: boolean;
};

type TCreateTestbookModalInnerProps<T> = {
  handleSubmit: (values: T) => void;
};

export function ResetProjectModal({
  id,
  context,
  innerProps: { handleSubmit },
}: ContextModalProps<
  TCreateTestbookModalInnerProps<ResetProjectModalFormValues>
>) {
  const form = useForm<ResetProjectModalFormValues>({
    initialValues: {
      removeChangelogs: false,
      removeNotes: false,
    },
    validate: {},
  });

  const close = () => context.closeModal(id);

  const handleFormSubmit = (values: ResetProjectModalFormValues) => {
    if (handleSubmit) {
      handleSubmit(values);
    }
    close();
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap="md">
        <Checkbox
          label="Remove changelogs"
          description="Remove all changelogs from the project."
          {...form.getInputProps("removeChangelogs", { type: "checkbox" })}
        />
        <Checkbox
          label="Reset notes"
          description="Remove all notes from the project."
          {...form.getInputProps("removeNotes", { type: "checkbox" })}
        />

        <Group justify="end" gap="md">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Reset</Button>
        </Group>
      </Stack>
    </form>
  );
}
