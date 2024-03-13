import {
  Button,
  Container,
  Flex,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { TModalProps } from "../_home/types";
import { useForm } from "@mantine/form";
import { TCaseDynamicData } from "../../schema";
import { useProject } from "../../lib/operators/useProject";
import { useParams } from "react-router-dom";

export function CreateTestCaseModal({ opened, close }: TModalProps) {
  const params = useParams();
  const project = useProject(params.projectId);
  const form = useForm<TCaseDynamicData>({
    initialValues: {
      title: "",
      description: "",
      jiraLink: "",
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Create Test Case"
      centered
      size="xl"
    >
      <Container>
        <form
          onSubmit={form.onSubmit((values) => {
            project.createTestCase(values);
            close();
          })}
        >
          <Flex direction="column" gap={16}>
            <TextInput
              withAsterisk
              label="Title"
              placeholder="My new test case"
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Description"
              rows={10}
              {...form.getInputProps("description")}
            />
            <TextInput
              label="Jira link URL"
              {...form.getInputProps("jiraLink")}
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
