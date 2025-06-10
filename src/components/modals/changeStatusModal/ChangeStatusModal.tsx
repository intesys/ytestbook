import {
  Button,
  Group,
  InputWrapper,
  Select,
  Stack,
  Textarea,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback, useMemo } from "react";
import { USER_ANONYMOUS } from "../../../lib/constants/generic.ts";
import { FormErrorMessages } from "../../../lib/formErrors.ts";
import { TUseProject } from "../../../lib/operators/types.ts";
import { StatusEnum } from "../../../types/schema.ts";
import { StatusMenuDropdown } from "../../statusMenu/StatusMenuDropdown.tsx";

export type ChangeStatusFormValues = {
  status: StatusEnum;
  collaboratorId?: string;
  notes?: string;
};

export type TChangeStatusModalInnerProps<T> = {
  project: TUseProject;
  defaultValues?: ChangeStatusFormValues;
  statusChangable?: boolean;
  handleSubmit: (values: T) => void;
};

export function ChangeStatusModal({
  id,
  context,
  innerProps: { project, defaultValues, handleSubmit, statusChangable = false },
}: ContextModalProps<TChangeStatusModalInnerProps<ChangeStatusFormValues>>) {
  const form = useForm<ChangeStatusFormValues>({
    initialValues: defaultValues ?? {
      status: StatusEnum.TODO,
      collaboratorId: "",
      notes: "",
    },
    validate: {
      collaboratorId: isNotEmpty(FormErrorMessages.required),
      // notes: isNotEmpty(FormErrorMessages.required),
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
      return (project.data.collaborators ?? [])
        .concat(USER_ANONYMOUS)
        .map((collaborator) => ({
          label: collaborator.name,
          value: collaborator.id,
        }));
    }
  }, [project.data?.collaborators]);

  const onStatusChange = useCallback(
    (status: StatusEnum) => {
      form.setFieldValue("status", status);
    },
    [form],
  );

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap="md">
        {statusChangable && (
          <InputWrapper
            label="Status"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <StatusMenuDropdown
              onSelect={onStatusChange}
              currentStatus={form.values.status}
            />
          </InputWrapper>
        )}

        <Select
          withAsterisk
          label="Assign to"
          placeholder="Select a Collaborator..."
          data={nameOptions}
          {...form.getInputProps("collaboratorId")}
        />

        <Textarea
          label="Notes"
          placeholder="Add some notes..."
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
