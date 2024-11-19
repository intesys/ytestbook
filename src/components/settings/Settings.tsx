import {
  ActionIcon,
  Alert,
  Anchor,
  Button,
  Flex,
  Group,
  Loader,
  Stack,
  Table,
  TagsInput,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconDeviceFloppy,
  IconFileExport,
  IconPencil,
  IconTrash,
  IconUserPlus,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "../../lib/operators/useProject";
import { useProjects } from "../../lib/operators/useProjects";
import { TCollaborator } from "../../types/schema.ts";
import { ActionIconWithConfirm } from "../actionIconWithConfirm/ActionIconWithConfirm.tsx";
import { Avatars } from "../avatars/Avatars.tsx";
import { Modals, openDeleteConfirmModal } from "../modals/modals.ts";
import classes from "./settings.module.css";

export function Settings() {
  const params = useParams();
  const projects = useProjects();
  const project = useProject(params.projectId);
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<TCollaborator[]>([]);

  useEffect(() => {
    if (project.data?.allTags) {
      setTags(project.data.allTags);
      if (project.data.collaborators)
        setCollaborators(project.data.collaborators);
    }
  }, [project.data]);

  const addCollaboratorHandler = useCallback(
    () =>
      modals.openContextModal({
        modal: Modals.CollaboratorModal,
        title: "Add Collaborator",
        innerProps: {
          handleSubmit: project.createCollaborator,
        },
      }),
    [project.createCollaborator],
  );

  const deleteTestbookHandler = useCallback(
    () =>
      openDeleteConfirmModal("Are you sure you want to delete this Testbook?", {
        handleConfirm: () => {
          projects.removeProject(project?.data?.id);
          navigate("/");
        },
      }),
    [navigate, project?.data?.id, projects],
  );

  if (project.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w="100%">
        <Loader color="blue" size="lg" />
      </Flex>
    );
  }

  return (
    <Stack className={classes.settings}>
      <Stack className={classes.header}>
        <Title order={3}>Settings</Title>
      </Stack>

      <Stack className={classes.projectData}>
        <Title order={4}>Project data</Title>
      </Stack>

      <Stack className={classes.collaborators} gap="md">
        <Title order={4}>Collaborators</Title>
        {collaborators.length === 0 ? (
          <Text span>
            The list is empty. Do you want to{" "}
            <Anchor onClick={addCollaboratorHandler}>add a Collaborator</Anchor>
            ?
          </Text>
        ) : (
          <Table verticalSpacing="xs" horizontalSpacing="sm" withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th visibleFrom="sm">
                  <Text fw="bold">Name</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw="bold" hiddenFrom="sm">
                    Name
                  </Text>
                  <Text fw="bold">Email</Text>
                </Table.Th>
                <Table.Th>
                  <Text fw="bold">&nbsp;</Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {collaborators.map((collaborator) => {
                const editCollaboratorHandler = () =>
                  modals.openContextModal({
                    modal: Modals.CollaboratorModal,
                    title: "Edit Collaborator",
                    innerProps: {
                      initialValues: {
                        name: collaborator.name,
                        email: collaborator.email,
                      },
                      id: collaborator.id,
                      handleSubmit: project.updateCollaborator,
                    },
                  });

                const deleteCollaboratorHandler = () =>
                  project.removeCollaborator(collaborator.id);

                return (
                  <Table.Tr key={collaborator.id}>
                    <Table.Td visibleFrom="sm">
                      <Group>
                        <Avatars collaborators={[collaborator]} />
                        <Text size="sm" visibleFrom="sm">
                          {collaborator.name}
                        </Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" hiddenFrom="sm" mb="xs">
                        {collaborator.name}
                      </Text>
                      <Text size="sm">{collaborator.email}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group justify="flex-end">
                        <ActionIcon
                          color="dark"
                          variant="subtle"
                          radius="xl"
                          onClick={editCollaboratorHandler}
                        >
                          <IconPencil />
                        </ActionIcon>

                        <ActionIconWithConfirm
                          color="red"
                          variant="subtle"
                          radius="xl"
                          onConfirm={deleteCollaboratorHandler}
                          icon={<IconTrash />}
                        />
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        )}
        <Group justify="end">
          <Button
            leftSection={<IconUserPlus size={18} />}
            onClick={addCollaboratorHandler}
          >
            Add Collaborator
          </Button>
        </Group>
      </Stack>

      <Stack className={classes.tags}>
        <Title order={4}>Tags</Title>
        <TagsInput data={[]} value={tags} onChange={setTags} />
        <Group justify="end">
          <Button
            w={105}
            leftSection={<IconDeviceFloppy size={18} />}
            onClick={() => {
              project.updateAllTags(tags);
              notifications.show({
                withBorder: true,
                title: "Success!",
                message: "The tags were updated",
              });
            }}
          >
            Save
          </Button>
        </Group>
      </Stack>

      <Alert className={classes.alert} color="green">
        <Stack>
          <Title order={4} c="green.7">
            Export project
          </Title>

          <Text span>Export and download this project as a JSON file</Text>

          <Group justify="end">
            <Button
              onClick={project.exportJSON}
              color="green.6"
              variant="filled"
              leftSection={<IconFileExport size={18} />}
            >
              Export Project
            </Button>
          </Group>
        </Stack>
      </Alert>

      <Alert className={classes.alert} color="red">
        <Stack>
          <Title order={4} c="red.7">
            Delete Testbook
          </Title>

          <Text span>
            The Testbook will be permanently deleted. This action is
            irreversible and can not be undone.
          </Text>

          <Group justify="end">
            <Button
              bg={"red"}
              leftSection={<IconTrash size={18} />}
              onClick={deleteTestbookHandler}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Alert>
    </Stack>
  );
}
