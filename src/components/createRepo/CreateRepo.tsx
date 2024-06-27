import { Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { useDocContext } from "../docContext/DocContext";
import { isNotEmpty, useForm } from "@mantine/form";
import { isValidAutomergeUrl } from "@automerge/automerge-repo";
import { FormErrorMessages } from "../../lib/formErrors";

export function CreateRepo() {
  const { createDoc, findAndSetDoc } = useDocContext();

  const form = useForm({
    initialValues: {
      docUrl: "",
    },
    validate: {
      docUrl: isNotEmpty(FormErrorMessages.required),
    },
  });

  return (
    <Flex
      align="center"
      justify="center"
      direction={"column"}
      gap={16}
      h="100dvh"
      w={"100%"}
    >
      <Title order={3}>Empty storage</Title>
      <Text>
        You don't have any repositories registered yet. Would you like to create
        one?
      </Text>
      <Button onClick={createDoc}>Create</Button>
      <Text>Or would you like to insert an existing repository URL?</Text>
      <form
        onSubmit={form.onSubmit((values) => {
          if (isValidAutomergeUrl(values.docUrl)) {
            localStorage.setItem("docUrl", values.docUrl);
            findAndSetDoc(values.docUrl);
          }
          form.reset();
        })}
      >
        <Flex gap={16} direction={"column"} align={"center"} justify={"center"}>
          <TextInput
            withAsterisk
            label="URL"
            w={400}
            {...form.getInputProps("docUrl")}
          />
          <Button type="submit">Insert</Button>
        </Flex>
      </form>
    </Flex>
  );
}
