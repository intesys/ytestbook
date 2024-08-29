import { AutomergeUrl, isValidAutomergeUrl } from "@automerge/automerge-repo";
import { useRepo } from "@automerge/automerge-repo-react-hooks";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { TDocType } from "../../types/schema";
import { FullPageSpinner } from "../fullPageSpinner/FullPageSpinner";
import {
  DocContextStatusEnum,
  TDocContextState,
  TDocContextValue,
  TDocProviderProps,
} from "./types";

const DocContext = createContext<TDocContextValue>({
  docUrl: undefined,
  createDoc: () => null,
  findAndSetDoc: () => null,
});

export function useDocContext() {
  return useContext(DocContext);
}

export const DocProvider: React.FC<TDocProviderProps> = ({
  children,
  docUrl: defaultDocUrl,
}) => {
  const repo = useRepo();
  const [state, setState] = useState<TDocContextState>({
    status: DocContextStatusEnum.LOADING,
  });
  const navigate = useNavigate();

  const createDoc = useCallback(() => {
    const handle = repo.create<TDocType>({
      projects: [],
      description: "",
      title: "",
    });
    setState((prevState: TDocContextState) => ({
      ...prevState,
      docUrl: handle.url,
      doc: handle.docSync(),
      changeDoc: handle.change,
    }));
  }, [navigate, repo]);

  const findAndSetDoc = useCallback(
    (docUrl: AutomergeUrl) => {
      const handle = repo.find<TDocType>(docUrl);
      setState({
        status: DocContextStatusEnum.READY,
        docUrl: handle.url,
        doc: handle.docSync(),
        changeDoc: handle.change,
      });
    },
    [repo],
  );

  useEffect(() => {
    if (isValidAutomergeUrl(defaultDocUrl)) {
      findAndSetDoc(defaultDocUrl);
    } else {
      setState({
        status: DocContextStatusEnum.READY,
        docUrl: undefined,
        doc: undefined,
        changeDoc: undefined,
      });
    }
  }, [defaultDocUrl, findAndSetDoc, navigate, repo]);

  switch (state.status) {
    case DocContextStatusEnum.LOADING:
      return <FullPageSpinner />;
    case DocContextStatusEnum.READY:
      return (
        <DocContext.Provider
          value={{
            docUrl: state.docUrl,
            createDoc,
            findAndSetDoc,
          }}
        >
          {children}
        </DocContext.Provider>
      );
  }
};
