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
import { useUseCasesContext } from "../../../context/useCasesContext";
import { TUseCasesData } from "../../../reducer/usecases/types";
import { theme } from "../../../theme";
import { ENTITIES_ACTIONS } from "../../../types";
import ActionMenu from "../../ui/ActionMenu/ActionMenu";

interface IOwnProp {
  item: TUseCasesData;
}

const UseCasesRow: React.FC<IOwnProp> = ({ item }) => {
  const { setAction } = useUseCasesContext();

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
        <Group onClick={() => setAction(ENTITIES_ACTIONS.VIEW, item.id)}>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Avatar color="yellow" radius="xl">
              UC1
            </Avatar>
          </MediaQuery>
          <Group direction="column" spacing={0}>
            <Group spacing="xs">
              {item.tags &&
                item.tags.map((tag) => <Badge size="xs">{tag}</Badge>)}
            </Group>
            <Title order={6}>{item.title}</Title>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Text
                size="xs"
                sx={{
                  maxWidth: "500px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {item.preview}
              </Text>
            </MediaQuery>
            <Text
              size="xs"
              sx={(theme) => ({
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.gray[5]
                    : theme.colors.dark[6],
              })}
            >
              {item.startDate &&
                item.endDate &&
                format(new Date(item.startDate), "dd-MM-yyyy") +
                  " - " +
                  format(new Date(item.endDate), "dd-MM-yyyy")}
            </Text>
          </Group>
        </Group>
        <Group ml={"auto"}>
          <ActionMenu onEdit={handleOnEdit} onDelete={handleOnDelete} />
        </Group>
      </Group>
    </Paper>
  );
};

export default UseCasesRow;
