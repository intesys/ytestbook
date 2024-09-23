import { Button, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback } from "react";
import { FormErrorMessages } from "../../../lib/formErrors.ts";

export type AddServerFormValues = {
  name: string;
  url: string;
  documentId: string;
};

type TCreateTestbookModalInnerProps<T> = {
  defaultValues?: AddServerFormValues;
  handleSubmit: (values: T) => void;
};

export function AddServerModal({
  id,
  context,
  innerProps: { defaultValues, handleSubmit },
}: ContextModalProps<TCreateTestbookModalInnerProps<AddServerFormValues>>) {
  const form = useForm<AddServerFormValues>({
    initialValues: defaultValues ?? {
      name: "",
      url: "",
      documentId: "",
    },
    validate: {
      name: isNotEmpty(FormErrorMessages.required),
      url: isNotEmpty(FormErrorMessages.required),
      // url: isValidWebSocketUrl,
      // documentId: isNotEmpty(FormErrorMessages.required),
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
          required
          data-autofocus
          {...form.getInputProps("name")}
        />
        <TextInput required label="Url" {...form.getInputProps("url")} />
        <TextInput
          label="Document Id"
          {...form.getInputProps("documentId")}
          description="(optional, it will be generated if empty)"
        />

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
