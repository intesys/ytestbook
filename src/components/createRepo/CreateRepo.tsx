import { Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { useDocContext } from "../docContext/DocContext";
import { isNotEmpty, useForm } from "@mantine/form";
import { isValidAutomergeUrl } from "@automerge/automerge-repo";
import { FormErrorMessages } from "../../lib/formErrors";
import { useNavigate } from "react-router";

export function CreateRepo() {
  const { createDoc, findAndSetDoc } = useDocContext();
  const navigate = useNavigate();

  const currentDocUrl = localStorage.getItem("docUrl");

  const isStorageEmpty = currentDocUrl === "";

  const form = useForm({
    initialValues: {
      docUrl: currentDocUrl ?? "",
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
      <Title order={3}>
        {isStorageEmpty ? "Empty storage" : "Set repository"}
      </Title>
      <Text>
        {isStorageEmpty
          ? "You don't have any repositories registered yet. Would you like to create one?"
          : "Would you like to create a new repository?"}
      </Text>
      <Button onClick={createDoc}>Create</Button>
      <Text>Or would you like to insert an existing repository URL?</Text>
      <form
        onSubmit={form.onSubmit((values) => {
          if (isValidAutomergeUrl(values.docUrl)) {
            localStorage.setItem("docUrl", values.docUrl);
            findAndSetDoc(values.docUrl);
            navigate("/");
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
          <Button type="submit">Set Repository URL</Button>
        </Flex>
      </form>
    </Flex>
  );
}
