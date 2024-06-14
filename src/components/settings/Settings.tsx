import {
  Alert,
  Button,
  Flex,
  Loader,
  Table,
  TagsInput,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import { useProject } from "../../lib/operators/useProject";
import { useProjects } from "../../lib/operators/useProjects";
import { TCollaborator, TCollaboratorDynamicData } from "../../schema";
import { CollaboratorModal } from "../collaboratorModal/CollaboratorModal";
import { ConfirmDeleteModal } from "../confirmDeleteModal/ConfirmDeleteModal";
import classes from "./settings.module.css";

export function Settings() {
  const params = useParams();
  const projects = useProjects();
  const project = useProject(params.projectId);
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [collaborators, setCollaborators] = useState<TCollaborator[]>([]);
  const [createModalOpened, createModalActions] = useDisclosure(false);
  const [editModalOpened, editModalActions] = useDisclosure(false);
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false);
  const [editModalValues, setEditModalValues] = useState<
    TCollaboratorDynamicData & Pick<TCollaborator, "id">
  >({
    id: "",
    name: "",
    email: "",
  });

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
        <ConfirmDeleteModal
          opened={deleteModalOpened}
          close={deleteModalHandlers.close}
          handleConfirm={() => {
            projects.removeProject(project.data.id);
            navigate("/");
          }}
        />

        <CollaboratorModal
          title="Add collaborator"
          opened={createModalOpened}
          close={createModalActions.close}
          handleSubmit={project.createCollaborator}
        />
        <CollaboratorModal
          id={editModalValues.id}
          initialValues={{
            name: editModalValues.name,
            email: editModalValues.email,
          }}
          title="Edit collaborator"
          opened={editModalOpened}
          close={editModalActions.close}
          handleSubmit={project.updateCollaborator}
        />
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
              verticalSpacing={"sm"}
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
                    <Text fw={"bold"}>Edit</Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={"bold"}>Delete</Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {collaborators.map((collaborator) => (
                  <Table.Tr key={collaborator.id}>
                    <Table.Td visibleFrom="sm">
                      <Text size="sm" visibleFrom="sm">
                        {collaborator.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" hiddenFrom="sm" mb="xs">
                        {collaborator.name}
                      </Text>
                      <Text size="sm">{collaborator.email}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Button
                        variant="transparent"
                        p={0}
                        onClick={() => {
                          setEditModalValues({
                            id: collaborator.id,
                            name: collaborator.name,
                            email: collaborator.email,
                          });
                          editModalActions.open();
                        }}
                      >
                        <img src={Edit} height={24} width={24} />
                      </Button>
                    </Table.Td>
                    <Table.Td>
                      <Button
                        variant="transparent"
                        p={0}
                        onClick={() =>
                          project.removeCollaborator(collaborator.id)
                        }
                      >
                        <img src={Delete} height={24} width={24} />
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
          <Flex mt={16} justify={"end"} w={"100%"}>
            <Button w={105} onClick={createModalActions.open}>
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
