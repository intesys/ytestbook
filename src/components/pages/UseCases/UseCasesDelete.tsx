import React, { useState } from "react";
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
import useHandleStatus from "./hooks/useHandleStatus";

interface IOwnProp {
  id: string;
}

const UseCasesDelete: React.FC<IOwnProp> = ({ id }) => {
  const {
    state: {
      usecase: { item: useCaseItem },
    },
    deleteUseCase,
  } = useUseCasesContext();

  const [checked, setChecked] = useState(false);

  const handleOnChange = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const target = e.target as EventTarget & HTMLInputElement;
    setChecked(target.checked);
  };

  useHandleStatus();

  return (
    <div>
      <Text size="sm">
        You are about to delete <strong>{useCaseItem?.title}</strong>.
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