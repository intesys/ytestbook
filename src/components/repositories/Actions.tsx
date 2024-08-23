import { useRepo } from "@automerge/automerge-repo-react-hooks";
import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useCallback } from "react";
import { TDocType } from "../../types/schema";
import { Modals } from "../modals/modals";
import { useServersContext } from "../serversContext/serversContext";
import { Repository } from "../serversContext/types";

type ActionsProps = {
  repo: Repository;
  repositoryId?: string;
};

export const Actions = ({ repo, repositoryId }: ActionsProps) => {
  const { updateServerStatus } = useServersContext();

  const repoHandler = useRepo();

  const createTestbookAction = useCallback(() => {
    let docHandle;

    if (!repo.repositoryIds || repo.repositoryIds.length === 0) {
      docHandle = repoHandler.create<TDocType>({
        projects: [],
        description: "",
        title: "",
      });
    } else {
      if (repositoryId) {
        docHandle = repoHandler.find<TDocType>(repositoryId as any);
      }
    }

    if (!docHandle) {
      return;
    }

    modals.openContextModal({
      modal: Modals.CreateTestbookModal,
      title: "Create project",
      centered: true,
      innerProps: {
        handleSubmit: (values) => {
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
  }, [repo, updateServerStatus]);

  return (
    <div>
      <Button onClick={createTestbookAction}>Add Project</Button>
    </div>
  );
};
