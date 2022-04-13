import {
  Avatar,
  Paper,
  Group,
  Text,
  Title,
  Badge,
  MediaQuery,
} from "@mantine/core";
import { format } from "date-fns";
import React from "react";
import { useMembersContext } from "../../../context/useMembersContext";
import { TMembersData } from "../../../reducer/members/types";
import { theme } from "../../../theme";
import { ENTITIES_ACTIONS } from "../../../types";
import ActionMenu from "../../ui/ActionMenu/ActionMenu";

interface IOwnProp {
  item: TMembersData;
}

const MembersRow: React.FC<IOwnProp> = ({ item }) => {
  const { setAction } = useMembersContext();

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
            <Avatar color="blue" radius="xl">
              M
            </Avatar>
          </MediaQuery>
          <Group direction="column" spacing={0}>
            <Title order={6}>
              {item.name}&nbsp;{item.surname}
            </Title>
            <Text size="xs">{item.role}</Text>
          </Group>
        </Group>
        <Group ml={"auto"}>
          <ActionMenu onEdit={handleOnEdit} onDelete={handleOnDelete} />
        </Group>
      </Group>
    </Paper>
  );
};

export default MembersRow;
