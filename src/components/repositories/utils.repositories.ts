import { AnyDocumentId, DocHandle, Repo } from "@automerge/automerge-repo";
import { YtServer } from "../serversContext/types";
import { TDocType } from "../../types/schema";

export const getDocHandlerFromRepo = (
  repo: YtServer,
  repoHandler: Repo,
  repositoryId?: string,
) => {
  let docHandle: DocHandle<TDocType> | undefined;

  // If no repository ids are found create one
  if (!repo.repositoryIds || repo.repositoryIds.length === 0) {
    docHandle = repoHandler.create<TDocType>({
      projects: [],
      description: "",
      title: "",
    });
  } else if (repositoryId) {
    docHandle = repoHandler.find<TDocType>(repositoryId as AnyDocumentId);
  }

  return docHandle;
};
