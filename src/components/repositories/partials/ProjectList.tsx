import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Card, Grid, Image, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { parseTimestamp } from "../../../lib/date/parseTimestamp";
import { TDocType } from "../../../types/schema";
import { YtServer } from "../../serversContext/types";
import classes from "../repositories.module.css";
import { routesHelper } from "../../../lib/helpers/routesHelper";
import { AnyDocumentId } from "@automerge/automerge-repo";
import VisibilityOff from "../../../assets/icons/visibility_off.svg";
import { openDeleteConfirmModal } from "../../modals/modals";
import { useProjectVisibility } from "../../../lib/repositories/useProjectVisibility";

type ProjectListProps = {
  repo: YtServer;
  repositoryId: string;
};

export const ProjectList = ({ repo, repositoryId }: ProjectListProps) => {
  const [doc] = useDocument<TDocType>(repositoryId as AnyDocumentId);
  const { hiddenProjectIds, hideProject } = useProjectVisibility();

  const navigate = useNavigate();

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
                  zIndex: 1000,
                  cursor: "pointer",
                }}
              />
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
