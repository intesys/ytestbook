import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import {
  Anchor,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useMemo } from "react";
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
import slugify from "slugify";
import { AddServerFormValues } from "../modals/addServerModal/AddServerModal";

export const Repositories: React.FC = () => {
  const { servers, disconnectFromServer, addServer } = useServersContext();

  const openAddServerModal = () => {
    modals.openContextModal({
      modal: Modals.AddServerModal,
      title: "Add server",
      centered: true,
      innerProps: {
        handleSubmit: (values: AddServerFormValues) => {
          addServer(values.name, {
            id: slugify(values.name),
            name: values.name,
            repositoryIds: [],
            status: SERVER_STATUS.CONNECTING,
            type: REPOSITORY_TYPE.remote,
            url: values.url,
          });
        },
      },
    });
  };

  const orderedServersKeys = useMemo(() => {
    return Object.keys(servers).sort((a, b) => {
      if (
        servers[a].type === REPOSITORY_TYPE.remote &&
        servers[b].type === REPOSITORY_TYPE.offline
      ) {
        return 1;
      }

      if (
        servers[a].type === REPOSITORY_TYPE.offline &&
        servers[b].type === REPOSITORY_TYPE.remote
      ) {
        return -1;
      }

      return a > b ? -1 : 1;
    });
  }, [servers]);

  return (
    <div className={classes.container}>
      <Container fluid>
        <Grid overflow="hidden">
          <Grid.Col
            span={{
              xl: 10,
              base: 12,
            }}
            offset={{
              xl: 1,
              base: 0,
            }}
          >
            <Stack gap={40} my={45}>
              <Image src={Logo} alt="yTestbook" w={78} mb={5} />
              <Stack gap={40}>
                {orderedServersKeys.map((serverId) => {
                  const repo = servers[serverId];

                  const handler = serversHandler[repo.id];

                  const isConnecting = repo.status === SERVER_STATUS.CONNECTING;

                  return (
                    <Box key={repo.id}>
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

                        {isConnecting ? (
                          <Group mb="sm">
                            <Loader c="white" />
                            <Title order={4} c="gray.3">
                              Connecting
                            </Title>
                          </Group>
                        ) : null}

                        <Grid opacity={isConnecting ? 0.5 : 1}>
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
              <Divider c="white" />
              <Anchor onClick={openAddServerModal} c="white">
                Connect to a remote server
              </Anchor>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
