import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Card, Grid, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { parseTimestamp } from "../../lib/date/parseTimestamp";
import { TDocType } from "../../types/schema";
import { Repository } from "../serversContext/types";
import classes from "./repositories.module.css";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { AnyDocumentId } from "@automerge/automerge-repo";

type ProjectListProps = {
  repo: Repository;
  repositoryId: string;
};

export const ProjectList = ({ repo, repositoryId }: ProjectListProps) => {
  const [doc] = useDocument<TDocType>(repositoryId as AnyDocumentId);

  const navigate = useNavigate();

  return (
    <>
      {doc?.projects.map((p) => (
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
          <Card
            className={classes.projectCard}
            p={20}
            radius={15}
            c="white"
            mih={228}
            display="flex"
            onClick={() =>
              navigate(routesHelper.projectDetail(repo.name, p.id))
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
              <Text>
                Last update:
                <br />
                {parseTimestamp(p.lastUpdate ?? p.createdAt)}
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      ))}
    </>
  );
};
