import { useCallback } from "react";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { FormErrorMessages } from "@/lib/formErrors.ts";
import { TProjectDynamicData } from "@/types/schema.ts";

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

  const close = () => context.closeModal(id);

  const handleFormSubmit = (values: TProjectDynamicData) => {
    if (handleSubmit) {
      handleSubmit(values);
    }
    close();
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Title"
          data-autofocus
          {...form.getInputProps("title")}
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
