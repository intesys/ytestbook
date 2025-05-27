import { AnyDocumentId } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import {
  ActionIcon,
  Card,
  Grid,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCloudUp, IconCopy } from "@tabler/icons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import VisibilityOff from "../../../assets/icons/visibility_off.svg";
import { parseTimestamp } from "../../../lib/date/parseTimestamp";
import { routesHelper } from "../../../lib/helpers/routesHelper";
import { useProjectVisibility } from "../../../lib/repositories/useProjectVisibility";
import { TDocType } from "../../../types/schema";
import { CloneProjectModalFormValues } from "../../modals/cloneProjectModal/CloneProjectModal";
import { CopyProjectToServerFormValues } from "../../modals/copyProjectToServer/CopyProjectToServer";
import { Modals, openDeleteConfirmModal } from "../../modals/modals";
import { useServersContext } from "../../serversContext/serversContext";
import { REPOSITORY_TYPE, YtServer } from "../../serversContext/types";
import { useCloneProject } from "../hooks/useCloneProject";
import { useCopyOfflineProjectToServer } from "../hooks/useCopyOfflineProjectToServer";
import classes from "../repositories.module.css";

type ProjectListProps = {
  repo: YtServer;
  repositoryId: string;
};

export const ProjectList = ({ repo, repositoryId }: ProjectListProps) => {
  const [doc] = useDocument<TDocType>(repositoryId as AnyDocumentId);
  const { hiddenProjectIds, hideProject } = useProjectVisibility();
  const { servers } = useServersContext();
  const copyOfflineProjectToServer = useCopyOfflineProjectToServer();
  const cloneProject = useCloneProject();

  const navigate = useNavigate();

  const hasRemoteServers = useMemo(() => {
    return (
      Object.values(servers).filter(
        (server) => server.type === REPOSITORY_TYPE.remote,
      ).length > 0
    );
  }, [servers]);

  return (
    <>
      {doc?.projects
        .filter((p) => !hiddenProjectIds.includes(p.id))
        .map((p) => {
          const hideProjectOnClick: React.MouseEventHandler<
            HTMLImageElement
          > = (e) => {
            e.preventDefault();
            e.stopPropagation();

            openDeleteConfirmModal(`Hide project ${p.title}?`, {
              confirmButtonLabel: "Hide",
              handleConfirm: () => hideProject(p.id),
            });
          };

          const copyProjectToServerOnClick = () => {
            modals.openContextModal({
              modal: Modals.CopyProjectToServer,
              title: "Copy project to server",
              centered: true,
              innerProps: {
                handleSubmit: (values: CopyProjectToServerFormValues) =>
                  copyOfflineProjectToServer(p, values.serverId),
              },
            });
          };
          const cloneProjectOnClick = () => {
            modals.openContextModal({
              modal: Modals.CloneProjectModal,
              title: "Clone Project",
              centered: true,
              innerProps: {
                handleSubmit: (values: CloneProjectModalFormValues) =>
                  cloneProject(p, values),
                currentName: p.title,
                currentServerId: repo.id,
              },
            });
          };

          return (
            <Grid.Col
              span={{ base: 12, sm: 6, md: 4, lg: 3 }}
              key={p.id}
              pos="relative"
            >
              <Image
                pos="absolute"
                w={24}
                top={15}
                right={15}
                src={VisibilityOff}
                alt="Hide project"
                onClick={hideProjectOnClick}
                style={{
                  zIndex: 10,
                  cursor: "pointer",
                }}
              />

              {repo.type === REPOSITORY_TYPE.offline && hasRemoteServers ? (
                <ActionIcon
                  onClick={copyProjectToServerOnClick}
                  pos="absolute"
                  w={24}
                  top={15 + 30}
                  right={45}
                  style={{
                    zIndex: 10,
                    cursor: "pointer",
                  }}
                  variant="transparent"
                  c="white"
                >
                  <IconCloudUp />
                </ActionIcon>
              ) : null}

              <ActionIcon
                onClick={cloneProjectOnClick}
                pos="absolute"
                w={24}
                top={15 + 30}
                right={15}
                style={{
                  zIndex: 10,
                  cursor: "pointer",
                }}
                variant="transparent"
                c="white"
              >
                <IconCopy />
              </ActionIcon>

              <Card
                className={classes.projectCard}
                p={20}
                radius={15}
                c="white"
                mih={228}
                display="flex"
                onClick={() =>
                  navigate(routesHelper.projectDetail(repo.id, p.id))
                }
              >
                <Stack gap={0} flex={1}>
                  <Text size="lg" fw={500} mb={5}>
                    {p.customer}
                  </Text>
                  <Title order={3} fw={700} mb={15}>
                    {p.title}
                  </Title>
                  <Text size="md" c="white" opacity={0.5} flex={1}>
                    {p.id}
                  </Text>
                  <Text>Last update:</Text>
                  <Text fw={700}>
                    {parseTimestamp(p.lastUpdate ?? p.createdAt)}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          );
        })}
    </>
  );
};
