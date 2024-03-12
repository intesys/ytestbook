import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { TDocType, TProject, TProjectDynamicData } from "../../schema";

type TUseProjects = {
  create: (values: TProjectDynamicData) => void;
  remove: (id: string) => void;
} & (
  | {
      data: undefined;
      loading: true;
    }
  | {
      data: TProject[];
      loading: false;
    }
);

export function useProjects(): TUseProjects {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const create = useCallback((values: TProjectDynamicData) => {
    const date = new Date();
    changeDoc((d) => {
      d.projects.push({
        ...values,
        id: crypto.randomUUID(),
        createdAt: date.getTime(),
        testCases: [],
      });
    });
  }, []);

  const remove = useCallback((id: string) => {
    changeDoc((d) => {
      const index = d.projects.findIndex((project) => project.id === id);
      delete d.projects[index];
    });
  }, []);

  if (doc === undefined) {
    return { data: undefined, loading: true, create, remove };
  } else {
    return { data: doc.projects, loading: false, create, remove };
  }
}
