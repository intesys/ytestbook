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
import { useTagsContext } from "../../../context/useTagsContext";
import { updateFieldsEditMode } from "../../../lib/dataHandling";
import { TTagsData } from "../../../reducer/tags/types";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../../types";
import { initialFields } from "./const";
import TagsDelete from "./TagsDelete";
import TagsForm from "./TagsForm";
import TagsRow from "./TagsRow";

const Tags: React.FC = () => {
  const {
    state: {
      action,
      tag: { item: tagItem },
      tags: { items: tagsItems, status: tagsStatus, operation: tagsOperation },
    },
    getTag,
    getTags,
    resetTag,
    setAction,
  } = useTagsContext();

  const [opened, setOpened] = useState(false);
  const wideScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (
      tagsStatus === LOADING_STATUS.SUCCESS &&
      tagsOperation === OPERATIONS_ACTIONS.SET
    ) {
      getTags();
    }
  }, [tagsStatus, tagsOperation]);

  useEffect(() => {
    if (action.id && action.type === ENTITIES_ACTIONS.EDIT) {
      getTag(action.id);
    }
  }, [action.type]);

  useEffect(() => {
    if (action.id && action.type === ENTITIES_ACTIONS.DELETE) {
      getTag(action.id);
    }
  }, [action.type]);

  useEffect(() => {
    if (action.type !== ENTITIES_ACTIONS.IDLE) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [action]);

  const renderTags = () => {
    switch (tagsStatus) {
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
        if (!tagsItems || tagsItems.length === 0) {
          return (
            <Alert icon={<MdErrorOutline size={16} />} title="No data">
              There is no Use Cases created yet, click on "Add new" button in
              order to create a new item.
            </Alert>
          );
        } else {
          return tagsItems.map((tag) => {
            return <TagsRow key={tag.id} item={tag} />;
          });
        }
    }
  };

  return (
    <>
      <Container p={0} sx={{ maxWidth: "960px", margin: "auto" }}>
        <Group>
          <Title order={2}>Tags</Title>
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
          {renderTags()}
        </Group>
      </Container>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.NEW}
        onClose={() => setAction(ENTITIES_ACTIONS.IDLE)}
        title="Add a new Tag"
        size={wideScreen ? "70%" : " 100%"}
        centered
      >
        <TagsForm initialValues={initialFields} />
      </Modal>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.EDIT}
        onClose={() => resetTag()}
        title="Edit Tag"
        size={wideScreen ? "70%" : " 100%"}
        centered
      >
        {action.id !== undefined && tagItem && (
          <TagsForm
            initialValues={
              updateFieldsEditMode(initialFields, tagItem) as TTagsData
            }
          />
        )}
      </Modal>
      <Modal
        opened={opened && action.type === ENTITIES_ACTIONS.DELETE}
        onClose={() => resetTag()}
        title={
          <>
            <Text>Are you sure to proceed?</Text>
          </>
        }
      >
        {action.id !== undefined && tagItem && <TagsDelete id={action.id} />}
      </Modal>
    </>
  );
};

export default Tags;
