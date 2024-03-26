import {
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
import { useParams } from "react-router-dom";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import { useProject } from "../../lib/operators/useProject";
import {
  TCollaborator,
  TCollaboratorDynamicData,
  TProject,
} from "../../schema";
import { CollaboratorModal } from "../collaboratorModal/CollaboratorModal";
import classes from "./settings.module.scss";

export function Settings() {
  const params = useParams();
  const project = useProject(params.projectId);
  const [tags, setTags] = useState<TProject["allTags"]>([]);
  const [collaborators, setCollaborators] = useState<TCollaborator[]>([]);
  const [createModalOpened, createModalActions] = useDisclosure(false);
  const [editModalOpened, editModalActions] = useDisclosure(false);
  const [editModalValues, setEditModalValues] = useState<
    TCollaboratorDynamicData & Pick<TCollaborator, "id">
  >({
    id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (project.data) {
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
              verticalSpacing={10}
              horizontalSpacing={20}
              withTableBorder
              mt={16}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Text fw={"bold"}>Name</Text>
                  </Table.Th>
                  <Table.Th>
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
                    <Table.Td>
                      <Text size="sm">{collaborator.name}</Text>
                    </Table.Td>
                    <Table.Td>
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

        <div className={classes.delete}>
          <Title order={4}>Delete project</Title>
          <Button
            bg={"red"}
            leftSection={
              <ThemeIcon color="white" variant={"transparent"} size={24}>
                <RiDeleteBin6Line size={24} />
              </ThemeIcon>
            }
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
