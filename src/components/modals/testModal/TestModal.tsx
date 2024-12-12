import {
  Button,
  Group,
  MultiSelect,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useCallback, useMemo } from "react";
import { FormErrorMessages } from "../../../lib/formErrors";
import { getStatusLabel } from "../../../lib/helpers/getStatusLabel.ts";
import {
  StatusEnum,
  TTestAggregatedData,
  TTestDynamicData,
} from "../../../types/schema";
import { TModalProps } from "../../repositories/types";
import { RichTextarea } from "../../shared/RichTextarea";
import { StatusIcon } from "../../statusIcon/StatusIcon.tsx";

type TTestModalForm = TTestDynamicData & TTestAggregatedData;

export function TestModal({
  id,
  context,
  innerProps: { handleSubmit, project, id: testId, initialValues },
}: ContextModalProps<TModalProps<TTestModalForm>>) {
  const form = useForm<TTestModalForm>({
    initialValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      tags: initialValues?.tags ?? [],
      assignees: initialValues?.assignees ?? [],
      relatedTests: initialValues?.relatedTests ?? [],
    },
    validate: {
      title: isNotEmpty(FormErrorMessages.required),
    },
  });

  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const handleFormSubmit = useCallback(
    (values: TTestModalForm) => {
      if (handleSubmit) {
        handleSubmit(values, testId);
      }

      close();
    },
    [close, handleSubmit, testId],
  );

  const assigneesChangeHandler = useCallback(
    (values: string[]) => form.setFieldValue("assignees", values),
    [form],
  );

  const tagsChangeHandler = useCallback(
    (values: string[]) => form.setFieldValue("tags", values),
    [form],
  );

  const relatedTestsChangeHandler = useCallback(
    (values: string[]) => form.setFieldValue("relatedTests", values),
    [form],
  );

  const groupedTests = useMemo(
    () =>
      project?.data?.testCases
        .map((testCase) => ({
          group: testCase.title,
          items:
            testCase.tests
              .filter((test) => test.id !== testId)
              .map((test) => ({
                value: test.id,
                label: test.title,
              })) ?? [],
        }))
        .filter((testCase) => testCase.items.length > 0),
    [project?.data?.testCases, testId],
  );

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack gap={16}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="My new test"
          {...form.getInputProps("title")}
        />
        <RichTextarea
          label={"Description"}
          {...form.getInputProps("description")}
        />
        <MultiSelect
          label="Assignees"
          data={
            project?.data?.collaborators?.map((collaborator) => ({
              value: collaborator.id,
              label: collaborator.name,
            })) || []
          }
          value={form.values.assignees}
          onChange={assigneesChangeHandler}
        />
        <MultiSelect
          label="Tags"
          data={project?.data?.allTags || []}
          value={form.values.tags}
          onChange={tagsChangeHandler}
        />

        <MultiSelect
          label="Related Tests"
          placeholder="Search for tests..."
          searchable
          description={
            <Group
              component="span"
              wrap="nowrap"
              justify="flex-start"
              align="center"
              gap={6}
            >
              <Text span size="sm">
                When a task fails, all related tests will be reset to
              </Text>
              <StatusIcon status={StatusEnum.PENDING} />
              <Text span size="sm">
                {getStatusLabel(StatusEnum.PENDING)}
              </Text>
            </Group>
          }
          data={groupedTests}
          value={form.values.relatedTests}
          onChange={relatedTestsChangeHandler}
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
