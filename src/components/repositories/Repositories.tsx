import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import {
  Anchor,
  Box,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useCallback, useMemo } from "react";
import slugify from "slugify";
import Dns from "../../assets/icons/dns.svg";
import Logout from "../../assets/icons/logout.svg";
import { GradientLayout } from "../layout/GradientLayout/GradientLayout";
import { AddServerFormValues } from "../modals/addServerModal/AddServerModal";
import { Modals } from "../modals/modals";
import {
  serversHandler,
  useServersContext,
} from "../serversContext/serversContext";
import { REPOSITORY_TYPE, SERVER_STATUS } from "../serversContext/types";
import { AnchorWithIcon } from "../shared/AnchorWithIcon";
import { useCheckForServerImport } from "./hooks/useCheckForServerImport";
import { Actions } from "./partials/Actions";
import { ProjectList } from "./partials/ProjectList";
import { ShareServer } from "./partials/ShareServer";

export const Repositories: React.FC = () => {
  const { servers, disconnectFromServer, addServer } = useServersContext();

  const addServerCallback = useCallback(
    (values: AddServerFormValues) => {
      addServer(values.name, {
        id: slugify(values.name),
        name: values.name,
        repositoryIds: [values.documentId],
        status: SERVER_STATUS.CONNECTING,
        type: REPOSITORY_TYPE.remote,
        url: values.url,
      });
    },
    [addServer],
  );

  useCheckForServerImport(addServerCallback);

  const openAddServerModal = () => {
    modals.openContextModal({
      modal: Modals.AddServerModal,
      title: "Add server",
      centered: true,
      innerProps: {
        handleSubmit: addServerCallback,
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
    <GradientLayout>
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
                  <Group gap={20} c="white" mb={20}>
                    <Title order={3} mb={0}>
                      {repo.name}
                    </Title>
                    <Text>
                      {repo.url} [{repo.repositoryIds[0]}]
                    </Text>

                    <AnchorWithIcon
                      onClick={() => disconnectFromServer(repo.id)}
                      icon={<Image src={Logout} alt="Disconnect" w={24} />}
                      label="Disconnect"
                    />

                    <ShareServer
                      repo={repo}
                      repositoryId={repo.repositoryIds[0]}
                    />
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
                    isConnecting={isConnecting}
                  />
                </Grid>
              </RepoContext.Provider>
            </Box>
          );
        })}
      </Stack>
      <Divider c="white" />
      <Anchor onClick={openAddServerModal} c="white">
        <Group gap="xs">
          <Image src={Dns} alt="Connect to a remote server" w={24} />
          Connect to a remote server
        </Group>
      </Anchor>
    </GradientLayout>
  );
};
