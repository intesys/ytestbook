import {
  Button,
  Container,
  Divider,
  Group,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useTestbookContext } from "../../../context/useTestbookContext";
import { LOADING_STATUS, OPERATIONS_ACTIONS } from "../../../types";

const UseCases: React.FC = () => {
  const {
    state: {
      testbook: {
        item: testbookItem,
        status: testbookStatus,
        operation: testbookOperation,
      },
    },
    setTestbook,
  } = useTestbookContext();

  const notifications = useNotifications();

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

  useEffect(() => {
    if (
      testbookStatus === LOADING_STATUS.SUCCESS &&
      testbookOperation === OPERATIONS_ACTIONS.SET
    )
      notifications.showNotification({
        title: "Content saved",
        color: "green",
        message: "The testbook was saved successfully",
      });
  }, [testbookStatus, testbookOperation]);

  useEffect(() => {
    if (
      testbookStatus === LOADING_STATUS.ERROR &&
      testbookOperation === OPERATIONS_ACTIONS.SET
    )
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the saving process",
      });
  }, [testbookStatus, testbookOperation]);

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
            disabled={testbookStatus === LOADING_STATUS.LOADING}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <TextInput
            placeholder="Description"
            label="Description"
            value={description}
            disabled={testbookStatus === LOADING_STATUS.LOADING}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <TextInput
            placeholder="Version"
            label="Version"
            required
            value={version}
            disabled={testbookStatus === LOADING_STATUS.LOADING}
            onChange={(event) => setVersion(event.currentTarget.value)}
          />
          <Button
            variant="light"
            color={"blue"}
            ml={"auto"}
            disabled={testbookStatus === LOADING_STATUS.LOADING}
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
