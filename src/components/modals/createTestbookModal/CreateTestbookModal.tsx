import { Button, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback } from "react";
import { TProjectDynamicData } from "../../../schema.ts";
import { FormErrorMessages } from "../../../lib/formErrors.ts";

type TCreateTestbookModalInnerProps<T> = {
  handleSubmit: (values: T) => void;
};

export function CreateTestbookModal({
  id,
  context,
  innerProps: { handleSubmit },
}: ContextModalProps<TCreateTestbookModalInnerProps<TProjectDynamicData>>) {
  const form = useForm<TProjectDynamicData>({
    initialValues: {
      title: "",
      customer: "",
    },
    validate: {
      title: isNotEmpty(FormErrorMessages.required),
      customer: isNotEmpty(FormErrorMessages.required),
    },
  });

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: TProjectDynamicData) => {
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
          label="Title"
          data-autofocus
          {...form.getInputProps("title")}
          error={form.errors["title"]}
        />
        <TextInput
          id="customer"
          label="Customer"
          {...form.getInputProps("customer")}
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
