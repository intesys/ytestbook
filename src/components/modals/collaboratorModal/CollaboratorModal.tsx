import { Button, Container, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { useEffect } from "react";
import { TCollaboratorDynamicData } from "../../../schema.ts";
import { TModalProps } from "../../home/types.ts";

//     <Modal [...] title={title} centered size={"xl"}>

export function CollaboratorModal({
  id,
  context,
  innerProps: { id: collaboratorId, initialValues, handleSubmit },
}: ContextModalProps<TModalProps<TCollaboratorDynamicData>>) {
  const form = useForm<TCollaboratorDynamicData>({
    initialValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const close = () => context.closeModal(id);

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
  }, [initialValues]);

  return (
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
  );
}
