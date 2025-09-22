import { ReactNode } from "react";
import { ChangeFn, ChangeOptions, Doc } from "@automerge/automerge";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { TDocType } from "@/types/schema.ts";

export type TDocContextValue = {
  docUrl: AutomergeUrl | undefined;
  createDoc: () => void;
  findAndSetDoc: (docUrl: AutomergeUrl) => void;
};

export enum DocContextStatusEnum {
  READY = "READY",
  LOADING = "LOADING",
}

export type TDocContextState =
  | {
      status: DocContextStatusEnum.READY;
      docUrl: AutomergeUrl | undefined;
      doc: Doc<TDocType> | undefined;
      changeDoc:
        | ((
            changeFn: ChangeFn<TDocType>,
            options?: ChangeOptions<TDocType> | undefined
          ) => void)
        | undefined;
    }
  | {
      status: Exclude<DocContextStatusEnum, "READY">;
    };

export type TDocContextProviderProps = {
  children: ReactNode;
  docUrl?: string;
};
