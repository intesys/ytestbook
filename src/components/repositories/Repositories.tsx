import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import {
  Anchor,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import Logo from "../../assets/logo.svg";
import {
  serversHandler,
  useServersContext,
} from "../serversContext/serversContext";
import { REPOSITORY_TYPE, SERVER_STATUS } from "../serversContext/types";
import { Actions } from "./Actions";
import { ProjectList } from "./ProjectList";
import classes from "./repositories.module.css";
import { modals } from "@mantine/modals";
import { Modals } from "../modals/modals";

export const Repositories: React.FC = () => {
  const { servers, disconnectFromServer, addServer } = useServersContext();
  console.log("🚀 ~ servers:", servers);

  const openAddServerModal = () => {
    modals.openContextModal({
      modal: Modals.AddServerModal,
      title: "Add server",
      centered: true,
      innerProps: {
        handleSubmit: (values) => {
          addServer(values.name, {
            name: values.name,
            repositoryIds: [],
            status: SERVER_STATUS.NO_REPOSITORY,
            type: REPOSITORY_TYPE.remote,
            url: values.url,
          });
          // const date = new Date();
          // docHandle.change((d) => {
          //   d.projects.push({
          //     ...values,
          //     id: crypto.randomUUID(),
          //     createdAt: date.getTime(),
          //     collaborators: [],
          //     collaboratorToTest: [],
          //     tagToTest: [],
          //     testCases: [],
          //     allTags: [],
          //     statusChanges: [],
          //     description: "",
          //   });
          // });
        },
      },
    });
  };

  return (
    <div className={classes.container}>
      <Container>
        <Grid>
          <Grid.Col>
            <Image src={Logo} alt="yTestbook" w={78} my={45} />
          </Grid.Col>

          <Grid.Col>
            <Stack gap={40}>
              {Object.values(servers).map((repo) => {
                const handler = serversHandler[repo.name];

                return (
                  <Box key={repo.name}>
                    <RepoContext.Provider value={handler}>
                      {repo.type === REPOSITORY_TYPE.offline ? (
                        <Title order={3} c="white" mb={20}>
                          Local Testbooks
                        </Title>
                      ) : (
                        <Group c="white" mb={20}>
                          <Title order={3} mb={0}>
                            {repo.name}
                          </Title>
                          <Text>{repo.url}</Text>

                          <Anchor
                            onClick={() => disconnectFromServer(repo.name)}
                            size="sm"
                            c="white"
                            fw={600}
                          >
                            Disconnect
                          </Anchor>
                        </Group>
                      )}

                      <Grid>
                        {repo.repositoryIds[0] ? (
                          <ProjectList
                            repo={repo}
                            repositoryId={repo.repositoryIds[0]}
                          />
                        ) : null}
                        <Actions
                          repo={repo}
                          repositoryId={repo.repositoryIds[0]}
                        />
                      </Grid>
                    </RepoContext.Provider>
                  </Box>
                );
              })}
            </Stack>
          </Grid.Col>

          <Grid.Col mb={50}>
            <Divider c="white" my={40} />
            <Anchor onClick={openAddServerModal} c="white">
              Connect to a remote server
            </Anchor>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
