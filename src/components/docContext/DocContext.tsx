import { isValidAutomergeUrl } from "@automerge/automerge-repo";
import { useRepo } from "@automerge/automerge-repo-react-hooks";
import { createContext, useContext, useEffect, useState } from "react";
import { TDocType } from "../../schema";
import { DocumentCreation } from "./DocumentCreation";
import {
  DocContextStatusEnum,
  TDocContextState,
  TDocContextValue,
  TDocProviderProps,
} from "./types";

const DocContext = createContext<TDocContextValue>({
  docUrl: undefined,
});

export function useDocContext() {
  return useContext(DocContext);
}

export function DocProvider({ children }: TDocProviderProps) {
  const repo = useRepo();
  const [state, setState] = useState<TDocContextState>({
    status: DocContextStatusEnum.LOADING,
  });

  const [docUrl, setDocUrl] = useState("");

  useEffect(() => {
    // const rootDocUrl = `${document.location.hash.substring(1)}`;
    const rootDocUrl = "automerge:4RpdwBc3FduatLdqyMYdCfj2qybs";
    if (isValidAutomergeUrl(rootDocUrl)) {
      const handle = repo.find<TDocType>(rootDocUrl);
      // const docUrl = (document.location.hash = handle.url);
      const docUrl = handle.url;
      setState({ status: DocContextStatusEnum.READY, docUrl });
      setDocUrl(docUrl);
    } else {
      setState({ status: DocContextStatusEnum.CREATE_DOC });
    }
  }, [repo]);

  switch (state.status) {
    case DocContextStatusEnum.LOADING:
      return <div className="loader" />;
    case DocContextStatusEnum.CREATE_DOC:
      return (
        <DocumentCreation
          create={() => {
            const handle = repo.create<TDocType>({ projects: [] });
            const docUrl = (document.location.hash = handle.url);
            setState({ status: DocContextStatusEnum.READY, docUrl });
            setDocUrl(docUrl);
          }}
        />
      );
    case DocContextStatusEnum.READY:
      return (
        <DocContext.Provider value={{ docUrl: state.docUrl }}>
          {children}
        </DocContext.Provider>
      );
  }
}
