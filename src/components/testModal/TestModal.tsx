import {
  Button,
  Container,
  Flex,
  Modal,
  MultiSelect,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../../lib/operators/useProject";
import { TTestDynamicData } from "../../schema";
import { TModalProps } from "../_home/types";
import { RichTextarea } from "../shared/RichTextarea";

export function TestModal({
  id: testId,
  initialValues,
  title,
  opened,
  close,
  handleSubmit,
}: TModalProps<TTestDynamicData & { tags: string[]; assignees: string[] }>) {
  const params = useParams();
  const project = useProject(params.projectId);
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);
  const [assignees, setAssignees] = useState<string[]>(
    initialValues?.assignees || [],
  );
  const form = useForm<Pick<TTestDynamicData, "title" | "description">>({
    initialValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues({
        title: initialValues?.title || "",
        description: initialValues?.description || "",
      });
      setTags(initialValues.tags);
      setAssignees(initialValues.assignees);
    }
  }, [initialValues]);

  return (
    <Modal opened={opened} onClose={close} title={title} centered size="xl">
      <Container>
        <form
          onSubmit={form.onSubmit((values) => {
            form.reset();
            testId !== undefined
              ? handleSubmit({ ...values, tags, assignees }, testId)
              : handleSubmit({ ...values, tags, assignees });
            setTags([]);
            setAssignees([]);
            close();
          })}
        >
          <Flex direction="column" gap={16}>
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
                project.data?.collaborators?.map((collaborator) => ({
                  value: collaborator.id,
                  label: collaborator.name,
                })) || []
              }
              value={assignees}
              onChange={setAssignees}
            />
            <MultiSelect
              label="Tags"
              data={project.data?.allTags || []}
              value={tags}
              onChange={setTags}
            />
          </Flex>

          <Flex justify="end" mt={16} gap={16}>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </Flex>
        </form>
      </Container>
    </Modal>
  );
}
