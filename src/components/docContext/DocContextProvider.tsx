import { useCallback, useEffect, useState } from "react";
import { AutomergeUrl, isValidAutomergeUrl } from "@automerge/automerge-repo";
import { useRepo } from "@automerge/automerge-repo-react-hooks";
import { DocContext } from "@/components/docContext/DocContext.tsx";
import {
  DocContextStatusEnum,
  TDocContextProviderProps,
  TDocContextState,
} from "@/components/docContext/types.ts";
import { FullPageSpinner } from "@/components/fullPageSpinner/FullPageSpinner.tsx";
import { TDocType } from "@/types/schema.ts";

export const DocContextProvider = ({
  children,
  docUrl: defaultDocUrl,
}: TDocContextProviderProps) => {
  const repo = useRepo();
  const [state, setState] = useState<TDocContextState>({
    status: DocContextStatusEnum.LOADING,
  });

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
  }, [repo]);

  const findAndSetDoc = useCallback(
    async (docUrl: AutomergeUrl) => {
      const handle = await repo.find<TDocType>(docUrl);
      setState({
        status: DocContextStatusEnum.READY,
        docUrl: handle.url,
        doc: handle.doc(),
        changeDoc: handle.change,
      });
    },
    [repo]
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
  }, [defaultDocUrl, findAndSetDoc]);

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
