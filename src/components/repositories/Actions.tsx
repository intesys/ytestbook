import React, { useCallback } from "react";
import { useDocContext } from "../docContext/DocContext";
import { Repository, SERVER_STATUS } from "../serversContext/types";
import { TDocType } from "../../types/schema";
import { useServersContext } from "../serversContext/serversContext";
import { modals } from "@mantine/modals";
import { useProjects } from "../../lib/operators/useProjects";
import { Modals } from "../modals/modals";
import { Button } from "@mantine/core";
import { useDocument, useRepo } from "@automerge/automerge-repo-react-hooks";

type ActionsProps = {
  repo: Repository;
};

export const Actions = ({ repo }: ActionsProps) => {
  const { updateServerStatus } = useServersContext();

  const repoHandler = useRepo();

  const [doc, changeDoc] = useDocument<TDocType>(repo.repositoryId);
  //   const projects = useProjects();

  const createTestbookAction = useCallback(() => {
    console.log("🚀 ~ createTestbookAction ~ repo:", repo);
    // if (!repo.repositoryId) {
    //   const docHandle = repoHandler.create<TDocType>({
    //     projects: [],
    //     description: "",
    //     title: "",
    //   });

    //   updateServerStatus(repo.name, SERVER_STATUS.CONNECTED, docHandle.url);
    // }

    modals.openContextModal({
      modal: Modals.CreateTestbookModal,
      title: "Create project",
      centered: true,
      innerProps: {
        handleSubmit: (values) => {
          //   projects.createProject(values);

          const date = new Date();
          changeDoc((d) => {
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
