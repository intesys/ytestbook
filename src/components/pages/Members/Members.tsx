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
  Loader,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { MdAdd, MdErrorOutline } from "react-icons/md";
import { useMembersContext } from "../../../context/useMembersContext";
import { updateFieldsEditMode } from "../../../lib/dataHandling";
import { TMembersData } from "../../../reducer/members/types";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../../types";
import { initialFields } from "./const";
import MembersDelete from "./MembersDelete";
import MembersForm from "./MembersForm";
import MembersRow from "./MembersRow";

const Members: React.FC = () => {
  const {
    state: {
      action,
      member: { item: memberItem },
      members: {
        items: membersItems,
        status: membersStatus,
        operation: membersOperation,
      },
    },
    getMember,
    getMembers,
    resetMember,
    setAction,
  } = useMembersContext();

  const [opened, setOpened] = useState(false);
  const wideScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    if (
      membersStatus === LOADING_STATUS.SUCCESS &&
      membersOperation === OPERATIONS_ACTIONS.SET
    ) {
      getMembers();
    }
  }, [membersStatus, membersOperation]);

  useEffect(() => {
    if (action.id && action.type === ENTITIES_ACTIONS.EDIT) {
      getMember(action.id);
    }
  }, [action.type]);

  useEffect(() => {
    if (action.id && action.type === ENTITIES_ACTIONS.DELETE) {
      getMember(action.id);
    }
  }, [action.type]);

  useEffect(() => {
    if (action.type !== ENTITIES_ACTIONS.IDLE) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [action]);

  const renderMembers = () => {
    switch (membersStatus) {
      case LOADING_STATUS.INIT:
      case LOADING_STATUS.LOADING:
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "50px 0px",
            }}
          >
            <Loader />
          </div>
        );
      case LOADING_STATUS.ERROR:
        return (
          <Alert icon={<MdErrorOutline size={16} />} title="Error">
            Something was wrong, please retry later.
          </Alert>
        );
      case LOADING_STATUS.SUCCESS:
        if (!membersItems || membersItems.length === 0) {
          return (
            <Alert icon={<MdErrorOutline size={16} />} title="No data">
              There is no Use Cases created yet, click on "Add new" button in
              order to create a new item.
            </Alert>
          );
        } else {
          return membersItems.map((member) => {
            return <MembersRow key={member.id} item={member} />;
          });
        }
    }
  };

  return (
    <>
      <Container p={0} sx={{ maxWidth: "960px", margin: "auto" }}>
        <Group>
          <Title order={2}>Members</Title>
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
          {renderMembers()}
        </Group>
      </Container>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.NEW}
        onClose={() => setAction(ENTITIES_ACTIONS.IDLE)}
        title="Add a new Member"
        size={wideScreen ? "70%" : " 100%"}
        centered
      >
        <MembersForm initialValues={initialFields} />
      </Modal>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.EDIT}
        onClose={() => resetMember()}
        title="Edit Member"
        size={wideScreen ? "70%" : " 100%"}
        centered
      >
        {action.id !== undefined && memberItem && (
          <MembersForm
            initialValues={
              updateFieldsEditMode(initialFields, memberItem) as TMembersData
            }
          />
        )}
      </Modal>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.DELETE}
        onClose={() => resetMember()}
        title={
          <>
            <Text>Are you sure to proceed?</Text>
          </>
        }
      >
        {action.id !== undefined && memberItem && (
          <MembersDelete id={action.id} />
        )}
      </Modal>
    </>
  );
};

export default Members;
