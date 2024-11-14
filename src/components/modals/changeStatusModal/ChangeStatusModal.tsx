import { Button, Group, Select, Stack, Textarea } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FormErrorMessages } from "../../../lib/formErrors.ts";
import { useProject } from "../../../lib/operators/useProject.ts";

export type ChangeStatusFormValues = {
  collaboratorId: string;
  notes: string;
};

type TChangeStatusModalInnerProps<T> = {
  defaultValues?: ChangeStatusFormValues;
  handleSubmit: (values: T) => void;
};

export function ChangeStatusModal({
  id,
  context,
  innerProps: { defaultValues, handleSubmit },
}: ContextModalProps<TChangeStatusModalInnerProps<ChangeStatusFormValues>>) {
  const params = useParams();
  const project = useProject(params.projectId);

  const form = useForm<ChangeStatusFormValues>({
    initialValues: defaultValues ?? {
      collaboratorId: "",
      notes: "",
    },
    validate: {
      collaboratorId: isNotEmpty(FormErrorMessages.required),
      notes: isNotEmpty(FormErrorMessages.required),
    },
  });

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: ChangeStatusFormValues) => {
      if (handleSubmit) {
        handleSubmit(values);
      }
      close();
    },
    [close, handleSubmit],
  );

  const nameOptions = useMemo(() => {
    if (project.data?.collaborators) {
      return project.data.collaborators.map((collaborator) => ({
        label: collaborator.name,
        value: collaborator.id,
      }));
    }
  }, [project.data?.collaborators]);

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap="md">
        <Select
          withAsterisk
          label="Member"
          data={nameOptions}
          {...form.getInputProps("collaboratorId")}
        />

        <Textarea
          label="Notes"
          placeholder="Your comment here"
          rows={6}
          {...form.getInputProps("notes")}
        />

        <Group justify="end" gap="md">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </Stack>
    </form>
  );
}
