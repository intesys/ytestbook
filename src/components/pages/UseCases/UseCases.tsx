import {
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Modal,
  Space,
  Title,
  Text,
  Alert,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { MdAdd, MdErrorOutline } from "react-icons/md";
import { useUseCasesContext } from "../../../context/useCasesContext";
import { updateFieldsEditMode } from "../../../lib/dataHandling";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../../types";
import { initialFields } from "./const";
import UseCasesDelete from "./UseCasesDelete";
import UseCasesDetail from "./UseCasesDetail";
import UseCasesForm from "./UseCasesForm";
import UseCasesRow from "./UseCasesRow";

const UseCases: React.FC = () => {
  const {
    state: {
      action,
      usecase: { item: useCaseItem },
      usecases: {
        items: useCasesItems,
        status: useCasesStatus,
        operation: useCasesOperation,
      },
    },
    getUseCase,
    getUseCases,
    setAction,
  } = useUseCasesContext();

  const [opened, setOpened] = useState(false);
  const wideScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    getUseCases();
  }, []);

  useEffect(() => {
    if (
      useCasesStatus === LOADING_STATUS.SUCCESS &&
      useCasesOperation === OPERATIONS_ACTIONS.SET
    )
      getUseCases();
  }, [useCasesStatus, useCasesOperation]);

  useEffect(() => {
    if (action.id && action.type === ENTITIES_ACTIONS.EDIT) {
      getUseCase(action.id);
    }
  }, [action.type]);

  useEffect(() => {
    if (action.type !== ENTITIES_ACTIONS.IDLE) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [action]);

  const renderUseCases = () => {
    if (!useCasesItems || useCasesItems.length === 0) {
      return (
        <Alert icon={<MdErrorOutline size={16} />} title="No data">
          There is no Use Cases created yet, click on "Add new" button in order
          to create a new item.
        </Alert>
      );
    } else {
      return useCasesItems.map((useCase) => {
        return <UseCasesRow key={useCase.id} item={useCase} />;
      });
    }
  };

  return (
    <>
      <Container p={0} sx={{ maxWidth: "960px", margin: "auto" }}>
        <Group>
          <Title order={2}>Use Cases</Title>
          <Button
            variant="light"
            color={"green"}
            leftIcon={<MdAdd />}
            ml={"auto"}
            onClick={() => setAction(ENTITIES_ACTIONS.NEW)}
          >
            Add new
          </Button>
        </Group>
        <Space h="xs" />
        <Divider />
        <Space h="xs" />
        <Group spacing={"sm"} direction="column" grow>
          {renderUseCases()}
        </Group>
      </Container>
      <Drawer
        opened={opened && action.type === ENTITIES_ACTIONS.VIEW}
        position="right"
        onClose={() => setAction(ENTITIES_ACTIONS.IDLE)}
        padding="xl"
        size="680px"
        styles={{
          drawer: { overflowY: "scroll", height: "100%" },
        }}
      >
        {action.id !== undefined && <UseCasesDetail id={action.id} />}
      </Drawer>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.NEW}
        onClose={() => setAction(ENTITIES_ACTIONS.IDLE)}
        title="Add a new Use Case"
        size={wideScreen ? "70%" : " 100%"}
        centered
      >
        <UseCasesForm initialValues={initialFields} />
      </Modal>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.EDIT}
        onClose={() => setAction(ENTITIES_ACTIONS.IDLE)}
        title="Edit Use Case"
        size={wideScreen ? "70%" : " 100%"}
        centered
      >
        {action.id !== undefined && useCaseItem && (
          <UseCasesForm
            initialValues={updateFieldsEditMode(initialFields, useCaseItem)}
          />
        )}
      </Modal>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.DELETE}
        onClose={() => setAction(ENTITIES_ACTIONS.IDLE)}
        title={
          <>
            <Text>Are you sure to proceed?</Text>
          </>
        }
      >
        {action.id !== undefined && <UseCasesDelete id={action.id} />}
      </Modal>
    </>
  );
};

export default UseCases;
