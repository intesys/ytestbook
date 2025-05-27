import {
  Button,
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback, useMemo } from "react";
import { FormErrorMessages } from "../../../lib/formErrors.ts";
import { useServersContext } from "../../serversContext/serversContext.tsx";

export type CloneProjectModalFormValues = {
  newName: string;
  resetStatuses: boolean;
  doNotImportNotes: boolean;
  serverId: string;
};

type TCreateTestbookModalInnerProps<T> = {
  handleSubmit: (values: T) => void;
  currentName: string;
  currentServerId: string;
};

export function CloneProjectModal({
  id,
  context,
  innerProps: { handleSubmit, currentName, currentServerId },
}: ContextModalProps<
  TCreateTestbookModalInnerProps<CloneProjectModalFormValues>
>) {
  const { servers } = useServersContext();
  const form = useForm<CloneProjectModalFormValues>({
    initialValues: {
      doNotImportNotes: true,
      newName: `${currentName} - Clone`,
      resetStatuses: true,
      serverId: currentServerId,
    },
    validate: {
      newName: isNotEmpty(FormErrorMessages.required),
    },
  });

  const serversOptions = useMemo(
    () =>
      Object.values(servers).map((server) => ({
        value: server.id,
        label: server.name,
      })),
    [servers],
  );

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: CloneProjectModalFormValues) => {
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
          label="New Project Name"
          placeholder="Enter new project name"
          {...form.getInputProps("newName")}
        />

        <Select
          data={serversOptions}
          label="Server"
          {...form.getInputProps("serverId")}
        />

        <Checkbox
          label="Reset statuses"
          description="Cloned project will have all statuses reset to 'TODO' and cleared changelogs."
          {...form.getInputProps("resetStatuses", { type: "checkbox" })}
        />
        <Checkbox
          label="Don't import notes"
          description="Don't copy all notes to the new cloned project."
          {...form.getInputProps("doNotImportNotes", { type: "checkbox" })}
        />

        <Group justify="end" gap="md">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Clone</Button>
        </Group>
      </Stack>
    </form>
  );
}
