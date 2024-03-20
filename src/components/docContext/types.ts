import { AutomergeUrl } from "@automerge/automerge-repo";

export type TDocContextValue = {
  docUrl: AutomergeUrl | undefined;
};

export enum DocContextStatusEnum {
  READY = "READY",
  CREATE_DOC = "CREATE_DOC",
  LOADING = "LOADING",
}

export type TDocContextState =
  | {
      status: DocContextStatusEnum.READY;
      docUrl: AutomergeUrl;
    }
  | {
      status: Exclude<DocContextStatusEnum, "READY">;
    };

export type TDocProviderProps = { children: React.ReactNode };

export type TDocumentCreationProps = {
  create: () => void;
};
