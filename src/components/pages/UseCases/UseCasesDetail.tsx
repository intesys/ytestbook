import {
  Avatar,
  Group,
  Text,
  Title,
  Badge,
  Divider,
  List,
  Button,
  Space,
} from "@mantine/core";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useUseCasesContext } from "../../../context/useCasesContext";
import { ENTITIES_ACTIONS, LOADING_STATUS } from "../../../types";

interface IOwnProp {
  id: string;
}

const UseCasesDetail: React.FC<IOwnProp> = ({ id }) => {
  const {
    state: {
      usecase: { item: useCaseItem, status: useCaseStatus },
    },
    getUseCase,
    setAction,
  } = useUseCasesContext();

  useEffect(() => {
    getUseCase(id);
  }, [id]);

  return (
    <div>
      {useCaseItem !== undefined && useCaseStatus === LOADING_STATUS.SUCCESS && (
        <>
          <Group direction="column" spacing="xs" grow>
            <Group spacing="xs">
              {useCaseItem.tags &&
                useCaseItem.tags.map((tag) => <Badge size="xs">{tag}</Badge>)}
            </Group>
            <Title order={5}>{useCaseItem?.title}</Title>
            <Divider my="xs" label="Details" />
            <Text size="sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: useCaseItem?.description ?? "",
                }}
              ></div>
            </Text>
            <Divider my="xs" label="Requirements" />
            <Text size="sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: useCaseItem?.requirements ?? "",
                }}
              ></div>
            </Text>
            <Divider my="xs" label="Period" />
            <Text size="sm">
              {useCaseItem.startDate &&
                useCaseItem.endDate &&
                format(new Date(useCaseItem.startDate), "dd-MM-yyyy") +
                  " - " +
                  format(new Date(useCaseItem.endDate), "dd-MM-yyyy")}
            </Text>
            <Divider my="xs" label="Reported by" />
            <Group>
              {useCaseItem.accountantId && (
                <Group>
                  <Avatar radius="xl" />
                  <Text>{useCaseItem.accountantId}</Text>
                </Group>
              )}
            </Group>
            <Divider my="xs" label="Assigned to" />
            <Group>
              {useCaseItem.responsibleId &&
                useCaseItem.responsibleId.map((user) => (
                  <Group>
                    <Avatar radius="xl" />
                    <Text>{user}</Text>
                  </Group>
                ))}
            </Group>
          </Group>
          <Space h="xl" />
          <Group position="right">
            <Button
              variant="light"
              color={"red"}
              leftIcon={<MdDelete />}
              onClick={() => setAction(ENTITIES_ACTIONS.DELETE, id)}
            >
              Delete
            </Button>
            <Button
              variant="light"
              color={"blue"}
              leftIcon={<MdEdit />}
              onClick={() => setAction(ENTITIES_ACTIONS.EDIT, id)}
            >
              Edit
            </Button>
          </Group>
        </>
      )}
    </div>
  );
};

export default UseCasesDetail;
