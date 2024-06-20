import {
  ActionIcon,
  Alert,
  Button,
  Flex,
  Group,
  Loader,
  Table,
  TagsInput,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openContextModal } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useProject } from "../../lib/operators/useProject";
import { useProjects } from "../../lib/operators/useProjects";
import { TCollaborator } from "../../schema";
import { ActionIconWithConfirm } from "../actionIconWithConfirm/ActionIconWithConfirm.tsx";
import { Avatars } from "../avatars/Avatars.tsx";
import { Modals } from "../modals/modals.ts";
import classes from "./settings.module.css";

export function Settings() {
  const params = useParams();
  const projects = useProjects();
  const project = useProject(params.projectId);
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<TCollaborator[]>([]);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);

  useEffect(() => {
    if (project.data?.allTags) {
      setTags(project.data.allTags);
      if (project.data.collaborators)
        setCollaborators(project.data.collaborators);
    }
  }, [project.data]);

  if (project.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w={"100%"}>
        <Loader color="blue" size="lg" />
      </Flex>
    );
  } else {
    return (
      <div className={classes.settings}>
        {/*<ConfirmDeleteModal
          opened={deleteModalOpened}
          close={deleteModalHandlers.close}
          handleConfirm={() => {
            projects.removeProject(project.data.id);
            navigate("/");
          }}
        />*/}

        <div className={classes.header}>
          <Title order={3}>Settings</Title>
        </div>

        <div className={classes.projectData}>
          <Title order={4}>Project data</Title>
        </div>

        <div className={classes.members}>
          <Title order={4}>Members</Title>
          {collaborators.length === 0 ? (
            <Text mt={16}>The list is empty</Text>
          ) : (
            <Table
              verticalSpacing={"xs"}
              horizontalSpacing={"sm"}
              withTableBorder
              mt={16}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th visibleFrom="sm">
                    <Text fw={"bold"}>Name</Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={"bold"} hiddenFrom="sm">
                      Name
                    </Text>
                    <Text fw={"bold"}>Email</Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={"bold"}>&nbsp;</Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {collaborators.map((collaborator) => (
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
                          onClick={() =>
                            openContextModal({
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
                            })
                          }
                        >
                          <IconPencil />
                        </ActionIcon>

                        <ActionIconWithConfirm
                          color="red"
                          variant="subtle"
                          radius="xl"
                          onConfirm={() =>
                            project.removeCollaborator(collaborator.id)
                          }
                          icon={<IconTrash />}
                        />
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
          <Flex mt={16} justify={"end"} w={"100%"}>
            <Button
              w={105}
              onClick={() =>
                openContextModal({
                  modal: Modals.CollaboratorModal,
                  title: "Add Collaborator",
                  innerProps: {
                    handleSubmit: project.createCollaborator,
                  },
                })
              }
            >
              Add
            </Button>
          </Flex>
        </div>

        <div className={classes.tags}>
          <Title order={4}>Tags</Title>
          <TagsInput mt={16} data={[]} value={tags} onChange={setTags} />
          <Flex mt={16} justify={"end"} w={"100%"}>
            <Button
              w={105}
              onClick={() => {
                project.updateAllTags(tags);
                notifications.show({
                  withBorder: true,
                  title: "Success!",
                  message: "The tags were updated",
                });
              }}
            >
              Submit
            </Button>
          </Flex>
        </div>

        <Alert className={classes.alert} color="green">
          <Title order={4}>Export project</Title>

          <Text>Export and download this project as a JSON file</Text>

          <Flex justify="end">
            <Button onClick={() => project.exportJSON()}>Export Project</Button>
          </Flex>
        </Alert>

        <Alert className={classes.alert} color="red">
          <Title order={4} mb="sm">
            Delete Testbook
          </Title>

          <Text>
            The Testbook will be permanently deleted. This action is
            irreversible and can not be undone.
          </Text>

          <Flex justify="end">
            <Button
              bg={"red"}
              leftSection={
                <ThemeIcon color="white" variant={"transparent"} size={24}>
                  <RiDeleteBin6Line size={24} />
                </ThemeIcon>
              }
              onClick={deleteModalHandlers.open}
            >
              Delete
            </Button>
          </Flex>
        </Alert>
      </div>
    );
  }
}
