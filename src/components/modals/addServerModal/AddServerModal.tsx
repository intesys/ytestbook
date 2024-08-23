import { Button, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback } from "react";
import { FormErrorMessages } from "../../../lib/formErrors.ts";

type TCreateTestbookModalInnerProps<T> = {
  handleSubmit: (values: T) => void;
};

type AddServerFormValues = {
  name: string;
  url: string;
};

export function AddServerModal({
  id,
  context,
  innerProps: { handleSubmit },
}: ContextModalProps<TCreateTestbookModalInnerProps<AddServerFormValues>>) {
  const form = useForm<AddServerFormValues>({
    initialValues: {
      name: "",
      url: "",
    },
    validate: {
      name: isNotEmpty(FormErrorMessages.required),
      url: isNotEmpty(FormErrorMessages.required),
    },
  });

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: AddServerFormValues) => {
      if (handleSubmit) {
        handleSubmit(values);
      }
      close();
    },
    [close, handleSubmit],
  );

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Name"
          data-autofocus
          {...form.getInputProps("name")}
        />
        <TextInput label="Url" {...form.getInputProps("url")} />

        <Group justify="end" gap="md">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </Group>
      </Stack>
    </form>
  );
}
