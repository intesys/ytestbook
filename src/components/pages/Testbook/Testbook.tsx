import {
  Button,
  Container,
  Divider,
  Group,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useTestbookContext } from "../../../context/useTestbookContext";
import { LOADING_STATUS } from "../../../reducer/testbook/types";

const UseCases: React.FC = () => {
  const {
    state: {
      testbook: { item: testbookItem, status: testbookStatus },
    },
    setTestbook,
  } = useTestbookContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    if (testbookItem && testbookStatus === LOADING_STATUS.SUCCESS) {
      setName(testbookItem.name);
      setDescription(testbookItem.description ?? "");
      setVersion(testbookItem.version);
    }
  }, [testbookStatus]);

  const handleClick = async () => {
    setTestbook({
      id: "1",
      name,
      description,
      version,
    });
  };

  return (
    <>
      <Container p={0} sx={{ maxWidth: "960px", margin: "auto" }}>
        <Group>
          <Title order={2}>Testbook settings</Title>
        </Group>
        <Space h="xs" />
        <Divider />
        <Space h="xs" />
        <Group direction="column" grow>
          <TextInput
            placeholder="Name"
            label="Name"
            required
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <TextInput
            placeholder="Description"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <TextInput
            placeholder="Version"
            label="Version"
            required
            value={version}
            onChange={(event) => setVersion(event.currentTarget.value)}
          />
          <Button
            variant="light"
            color={"blue"}
            ml={"auto"}
            onClick={handleClick}
          >
            Save
          </Button>
        </Group>
      </Container>
    </>
  );
};

export default UseCases;
