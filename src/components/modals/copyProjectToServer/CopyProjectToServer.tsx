import { Button, Group, Select, Stack } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback, useMemo } from "react";
import { FormErrorMessages } from "../../../lib/formErrors.ts";
import { useServersContext } from "../../serversContext/serversContext.tsx";
import { REPOSITORY_TYPE } from "../../serversContext/types.ts";

export type CopyProjectToServerFormValues = {
  serverId: string;
};

type TCreateTestbookModalInnerProps<T> = {
  handleSubmit: (values: T) => void;
};

export function CopyProjectToServer({
  id,
  context,
  innerProps: { handleSubmit },
}: ContextModalProps<
  TCreateTestbookModalInnerProps<CopyProjectToServerFormValues>
>) {
  const { servers } = useServersContext();
  const form = useForm<CopyProjectToServerFormValues>({
    initialValues: {
      serverId: "",
    },
    validate: {
      serverId: isNotEmpty(FormErrorMessages.required),
    },
  });

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: CopyProjectToServerFormValues) => {
      if (handleSubmit) {
        handleSubmit(values);
      }
      close();
    },
    [close, handleSubmit],
  );

  const serversOptions = useMemo(
    () =>
      Object.values(servers)
        .filter((server) => server.type === REPOSITORY_TYPE.remote)
        .map((server) => ({
          value: server.id,
          label: server.name,
        })),
    [servers],
  );

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap="md">
        <Select
          data={serversOptions}
          label="Server"
          {...form.getInputProps("serverId")}
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
