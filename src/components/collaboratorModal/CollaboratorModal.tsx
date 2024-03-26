import { Button, Container, Flex, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { TCollaboratorDynamicData } from "../../schema";
import { TModalProps } from "../_home/types";

export function CollaboratorModal({
  id: collaboratorId,
  initialValues,
  title,
  opened,
  close,
  handleSubmit,
}: TModalProps<TCollaboratorDynamicData>) {
  const form = useForm<TCollaboratorDynamicData>({
    initialValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
    },
  });

  useEffect(() => {
    if (initialValues) form.setValues(initialValues);
  }, [initialValues]);
  return (
    <Modal opened={opened} onClose={close} title={title} centered size={"xl"}>
      <Container>
        <form
          onSubmit={form.onSubmit((values) => {
            form.reset();
            collaboratorId !== undefined
              ? handleSubmit(values, collaboratorId)
              : handleSubmit(values);
            close();
          })}
        >
          <Flex direction={"column"} gap={16}>
            <TextInput
              withAsterisk
              label="Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Email"
              {...form.getInputProps("email")}
            />
          </Flex>

          <Flex justify={"end"} mt={16} gap={16}>
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
