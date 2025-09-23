import React, { useCallback, useMemo } from "react";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { IconLogin, IconTrash } from "@tabler/icons-react";
import slugify from "slugify";
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
import Dns from "@/assets/icons/dns.svg";
import Eye from "@/assets/icons/eye.svg";
import Logout from "@/assets/icons/logout.svg";
import { GradientLayout } from "@/components/layout/GradientLayout/GradientLayout";
import { AddServerFormValues } from "@/components/modals/addServerModal/AddServerModal";
import { Modals } from "@/components/modals/modals";
import { useServersContext } from "@/components/serversContext/hooks/useServersContext.ts";
import { serversHandler } from "@/components/serversContext/serversContext";
import {
  REPOSITORY_TYPE,
  SERVER_STATUS,
} from "@/components/serversContext/types";
import { AnchorWithIcon } from "@/components/shared/AnchorWithIcon";
import { useProjectVisibility } from "@/lib/repositories/useProjectVisibility";
import { useCheckForServerImport } from "./hooks/useCheckForServerImport";
import { Actions } from "./partials/Actions";
import { ProjectList } from "./partials/ProjectList";
import { ShareServer } from "./partials/ShareServer";

/**
 * Component to display and manage repositories and their servers.
 */
export const Repositories: React.FC = () => {
  const {
    servers,
    disconnectFromServer,
    connectToServer,
    addServer,
    removeServer,
  } = useServersContext();
  const { hiddenProjectIds, showAllProjects } = useProjectVisibility();

  const addServerCallback = useCallback(
    (values: AddServerFormValues) => {
      addServer(values.name, {
        id: slugify(values.name),
        name: values.name,
        repositoryIds: [values.documentId],
        status: SERVER_STATUS.IDLE,
        type: REPOSITORY_TYPE.remote,
        url: values.url,
        opened: true,
      });
    },
    [addServer]
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

                    {repo.opened ? (
                      <AnchorWithIcon
                        onClick={() => disconnectFromServer(repo.id)}
                        icon={<Image src={Logout} alt="Disconnect" w={24} />}
                        label="Disconnect"
                      />
                    ) : (
                      <AnchorWithIcon
                        onClick={() => connectToServer(repo.id)}
                        icon={<IconLogin />}
                        label="Connect"
                      />
                    )}

                    <AnchorWithIcon
                      onClick={() => removeServer(repo.id)}
                      icon={<IconTrash />}
                      label="Remove"
                    />

                    <ShareServer
                      repo={repo}
                      repositoryId={repo.repositoryIds[0]}
                    />
                  </Group>
                )}

                {repo.status === SERVER_STATUS.CONNECTING ? (
                  <Group mb="sm">
                    <Loader color="white" />
                    <Title order={4} c="gray.3">
                      Connecting
                    </Title>
                  </Group>
                ) : null}

                {repo.opened &&
                repo.status === SERVER_STATUS.CONNECTED &&
                repo.repositoryIds[0] ? (
                  <Grid>
                    <ProjectList
                      repo={repo}
                      repositoryId={repo.repositoryIds[0]}
                    />
                    <Actions
                      repo={repo}
                      repositoryId={repo.repositoryIds[0]}
                      isConnecting={false}
                    />
                  </Grid>
                ) : null}
              </RepoContext.Provider>
            </Box>
          );
        })}
      </Stack>
      <Divider c="white" />
      <Group>
        <Anchor onClick={openAddServerModal} c="white">
          <Group gap="xs">
            <Image src={Dns} alt="Connect to a remote server" w={24} />
            Connect to a remote server
          </Group>
        </Anchor>

        {hiddenProjectIds.length > 0 ? (
          <Anchor onClick={showAllProjects} c="white">
            <Group gap="xs">
              <Image
                src={Eye}
                alt={`Show ${hiddenProjectIds.length} hidden projects`}
                w={24}
              />
              Show {hiddenProjectIds.length} hidden projects
            </Group>
          </Anchor>
        ) : null}
      </Group>
    </GradientLayout>
  );
};
