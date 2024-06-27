import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback, useEffect } from "react";
import { TCollaboratorDynamicData } from "../../../schema.ts";
import { TModalProps } from "../../home/types.ts";

export function CollaboratorModal({
  id,
  context,
  innerProps: { id: collaboratorId, initialValues, handleSubmit },
}: ContextModalProps<TModalProps<TCollaboratorDynamicData>>) {
  const form = useForm<TCollaboratorDynamicData>({
    initialValues: {
      name: initialValues?.name ?? "",
      email: initialValues?.email ?? "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.setValues, initialValues]);

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: TCollaboratorDynamicData) => {
      if (handleSubmit) {
        handleSubmit(values, collaboratorId);
      }
      close();
    },
    [close, collaboratorId, handleSubmit],
  );

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap="md">
        <Stack gap="md">
          <TextInput
            withAsterisk
            label="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Email"
            {...form.getInputProps("email")}
          />
        </Stack>

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
