import { Avatar, Paper, Group, Title, MediaQuery } from "@mantine/core";
import { format } from "date-fns";
import React from "react";
import { useTagsContext } from "../../../context/useTagsContext";
import { TTagsData } from "../../../reducer/tags/types";
import { theme } from "../../../theme";
import { ENTITIES_ACTIONS } from "../../../types";
import ActionMenu from "../../ui/ActionMenu/ActionMenu";

interface IOwnProp {
  item: TTagsData;
}

const TagsRow: React.FC<IOwnProp> = ({ item }) => {
  const { setAction } = useTagsContext();

  const handleOnEdit = () => {
    setAction(ENTITIES_ACTIONS.EDIT, item.id);
  };

  const handleOnDelete = () => {
    setAction(ENTITIES_ACTIONS.DELETE, item.id);
  };

  return (
    <Paper
      p="md"
      shadow="xs"
      sx={(theme) => ({
        cursor: "pointer",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <Group>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Avatar color="red" radius="xl">
              T
            </Avatar>
          </MediaQuery>
          <Group direction="column" spacing={0}>
            <Title order={6}>{item.label}</Title>
          </Group>
        </Group>
        <Group ml={"auto"}>
          <ActionMenu onEdit={handleOnEdit} onDelete={handleOnDelete} />
        </Group>
      </Group>
    </Paper>
  );
};

export default TagsRow;
