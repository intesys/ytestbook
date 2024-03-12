import { ChangeEvent, useState } from "react";
import { useProjects } from "../../lib/operators/useProjects";
import { Button, Container, Flex, Modal, TextInput } from "@mantine/core";
import { TCreateTestbookModalProps } from "./types";
import { TProjectDynamicData } from "../../schema";

export function CreateTestbookModal({
  opened,
  close,
}: TCreateTestbookModalProps) {
  const projects = useProjects();
  const [newTestbookData, setNewTestbookData] = useState<TProjectDynamicData>({
    customer: "",
    title: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id && e.target.value) {
      setNewTestbookData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Create project" centered>
      <Container pb={16}>
        <Flex direction="column" gap={16}>
          <TextInput
            id="title"
            label="Title"
            data-autofocus
            onChange={handleChange}
          />
          <TextInput id="customer" label="Customer" onChange={handleChange} />
        </Flex>
      </Container>
      <Flex justify="end" mt={16} gap={16}>
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            projects.create(newTestbookData);
            close();
          }}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  );
}
