import { useRepo } from "@automerge/automerge-repo-react-hooks";
import { Grid, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback } from "react";
import addCircle from "../../../assets/icons/add_circle.svg";
import { Modals } from "../../modals/modals";
import { YtServer } from "../../serversContext/types";
import { ActionButton } from "../../shared/ActionButton/ActionButton";
import { ImportJSON } from "./ImportJSON";
import { getDocHandlerFromRepo } from "../utils.repositories";
import { TProjectDynamicData } from "../../../types/schema";

type ActionsProps = {
  repo: YtServer;
  repositoryId?: string;
  isConnecting: boolean;
};

export const Actions = ({ repo, repositoryId, isConnecting }: ActionsProps) => {
  const repoHandler = useRepo();

  const createTestbookAction = useCallback(() => {
    const docHandle = getDocHandlerFromRepo(repo, repoHandler, repositoryId);

    // check that docHandle has been initialized
    if (!docHandle) {
      return;
    }

    modals.openContextModal({
      modal: Modals.CreateTestbookModal,
      title: "Create project",
      centered: true,
      innerProps: {
        handleSubmit: (values: TProjectDynamicData) => {
          const date = new Date();

          docHandle.change((d) => {
            d.projects.push({
              ...values,
              id: crypto.randomUUID(),
              createdAt: date.getTime(),
              collaborators: [],
              collaboratorToTest: [],
              tagToTest: [],
              testCases: [],
              allTags: [],
              statusChanges: [],
              description: "",
            });
          });
        },
      },
    });
  }, [repo.repositoryIds, repoHandler, repositoryId]);

  return (
    <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
      <Stack gap={10}>
        <ActionButton
          onClick={createTestbookAction}
          justify="left"
          icon={addCircle}
          disabled={isConnecting}
        >
          <Text span fw={700}>
            Create a new
          </Text>{" "}
          <Text span fw={400}>
            Testbook
          </Text>
        </ActionButton>

        <ImportJSON
          repo={repo}
          repositoryId={repositoryId}
          isConnecting={isConnecting}
        />
      </Stack>
    </Grid.Col>
  );
};
