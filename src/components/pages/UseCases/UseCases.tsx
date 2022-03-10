import {
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Modal,
  Space,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useUseCasesContext } from "../../../context/useCasesContext";
import { ENTITIES_ACTIONS } from "../../../types";
import UseCasesDetail from "./UseCasesDetail";
import UseCasesRow from "./UseCasesRow";

const UseCases: React.FC = () => {
  const { useCases, setUseCases } = useUseCasesContext();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (useCases.action !== ENTITIES_ACTIONS.IDLE) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [useCases.action]);

  return (
    <>
      <Container padding={0} sx={{ maxWidth: "960px", margin: "auto" }}>
        <Group>
          <Title order={2}>Use Cases</Title>
          <Button
            variant="light"
            color={"green"}
            leftIcon={<MdAdd />}
            ml={"auto"}
            onClick={() => setUseCases({ action: ENTITIES_ACTIONS.NEW })}
          >
            Add new
          </Button>
        </Group>
        <Space h="xs" />
        <Divider />
        <Space h="xs" />
        <Group spacing={"sm"} direction="column" grow>
          <UseCasesRow />
          <UseCasesRow />
          <UseCasesRow />
        </Group>
      </Container>
      <Drawer
        opened={opened && useCases.action === ENTITIES_ACTIONS.VIEW}
        position="right"
        onClose={() => setUseCases({ action: ENTITIES_ACTIONS.IDLE })}
        padding="xl"
        size="680px"
        styles={{
          drawer: { overflowY: "scroll", height: "100%" },
        }}
      >
        <UseCasesDetail />
      </Drawer>
      <Modal
        opened={opened && useCases.action === ENTITIES_ACTIONS.NEW}
        onClose={() => setUseCases({ action: ENTITIES_ACTIONS.IDLE })}
        title="NEW Use Case!"
      ></Modal>
      <Modal
        opened={opened && useCases.action === ENTITIES_ACTIONS.EDIT}
        onClose={() => setUseCases({ action: ENTITIES_ACTIONS.IDLE })}
        title="EDIT Use Case!"
      ></Modal>
      <Modal
        opened={opened && useCases.action === ENTITIES_ACTIONS.DELETE}
        onClose={() => setUseCases({ action: ENTITIES_ACTIONS.IDLE })}
        title="Delete Use Case!"
      ></Modal>
    </>
  );
};

export default UseCases;
