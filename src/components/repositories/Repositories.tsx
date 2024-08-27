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
import slugify from "slugify";

export const Repositories: React.FC = () => {
  const { servers, disconnectFromServer, addServer } = useServersContext();

  const openAddServerModal = () => {
    modals.openContextModal({
      modal: Modals.AddServerModal,
      title: "Add server",
      centered: true,
      innerProps: {
        handleSubmit: (values) => {
          addServer(values.name, {
            id: slugify(values.name),
            name: values.name,
            repositoryIds: [],
            status: SERVER_STATUS.NO_REPOSITORY,
            type: REPOSITORY_TYPE.remote,
            url: values.url,
          });
        },
      },
    });
  };

  return (
    <div className={classes.container}>
      <Container fluid>
        <Grid>
          <Grid.Col
            span={{
              xl: 10,
              xs: 12,
            }}
            offset={{
              xl: 1,
              md: 0,
            }}
          >
            <Stack gap={40} my={45}>
              <Image src={Logo} alt="yTestbook" w={78} mb={5} />
              <Stack gap={40}>
                {Object.values(servers).map((repo) => {
                  const handler = serversHandler[repo.id];

                  console.log(repo, repo.repositoryIds[0]);

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
