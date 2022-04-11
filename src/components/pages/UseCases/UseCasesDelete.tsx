import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Group,
  List,
  Space,
  Text,
} from "@mantine/core";
import { MdDelete } from "react-icons/md";
import { useUseCasesContext } from "../../../context/useCasesContext";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../../types";
import { useNotifications } from "@mantine/notifications";

interface IOwnProp {
  id: string;
}

const UseCasesDelete: React.FC<IOwnProp> = ({ id }) => {
  const {
    state: {
      action: { type: actionType },
      usecase: { status: useCaseStatus, operation: useCaseOperation },
    },
    setAction,
    resetUseCase,
    deleteUseCase,
  } = useUseCasesContext();

  const notifications = useNotifications();

  const [checked, setChecked] = useState(false);

  const handleOnChange = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as EventTarget & HTMLInputElement;
    setChecked(target.checked);
  };

  const exitStrategy = () => {
    resetUseCase();
    setAction(ENTITIES_ACTIONS.IDLE);
  };

  useEffect(() => {
    // DELETE : SUCCESS
    if (
      useCaseStatus === LOADING_STATUS.SUCCESS &&
      useCaseOperation === OPERATIONS_ACTIONS.DELETE
    ) {
      notifications.showNotification({
        title: "Content deleted successfully",
        color: "green",
        message: "The Use Case was delete successfully",
      });
      exitStrategy();
    }

    // DELETE : ERROR
    if (
      useCaseStatus === LOADING_STATUS.ERROR &&
      useCaseOperation === OPERATIONS_ACTIONS.DELETE
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the delete process",
      });
      exitStrategy();
    }
  }, [useCaseStatus, useCaseOperation, actionType]);

  return (
    <div>
      <Text size="sm">
        You are about to delete <strong>Use Case 1</strong>.
      </Text>
      <Divider my="xs" label="Read this carefully" />
      <Text size="sm">This also:</Text>

      <List size="sm">
        <List.Item>Deletes all related test results.</List.Item>
        <List.Item>
          Un-assigns this test case from its related test runs.
        </List.Item>
        <List.Item>Affects the outcomes of those test runs.</List.Item>
      </List>

      <Space h="md" />
      <Checkbox label="Yes, I am sure." onClick={(e) => handleOnChange(e)} />
      <Space h="md" />
      <Group position="right">
        <Button
          disabled={!checked}
          variant="light"
          color={"red"}
          leftIcon={<MdDelete />}
          onClick={() => {
            deleteUseCase(id);
          }}
        >
          Delete
        </Button>
      </Group>
    </div>
  );
};

export default UseCasesDelete;
