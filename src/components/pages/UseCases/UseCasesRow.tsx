import {
  Avatar,
  Paper,
  Group,
  Text,
  Title,
  Badge,
  MediaQuery,
} from "@mantine/core";
import React from "react";
import { useUseCasesContext } from "../../../context/useCasesContext";
import { ENTITIES_ACTIONS } from "../../../types";
import ActionMenu from "../../ui/ActionMenu/ActionMenu";

const UseCasesRow: React.FC = () => {
  const { setUseCases } = useUseCasesContext();

  const handleOnEdit = () => {
    setUseCases({ id: 1, action: ENTITIES_ACTIONS.EDIT });
  };

  const handleOnDelete = () => {
    setUseCases({ id: 1, action: ENTITIES_ACTIONS.DELETE });
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
        <Group
          onClick={() => setUseCases({ id: 1, action: ENTITIES_ACTIONS.VIEW })}
        >
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Avatar color="yellow" radius="xl">
              UC1
            </Avatar>
          </MediaQuery>
          <Group direction="column" spacing={0}>
            <Group spacing="xs">
              <Badge size="xs">Tag 1</Badge>
              <Badge size="xs">Tag 2</Badge>
              <Badge size="xs">Tag 2</Badge>
            </Group>
            <Title order={6}>Richiesta finanziamento con SPID</Title>
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
                Richiesta finanziamento per Cliente con cittadinanza Italiana,
                in possesso di SPiD
              </Text>
            </MediaQuery>
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
