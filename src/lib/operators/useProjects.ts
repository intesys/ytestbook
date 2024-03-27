import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { TDocType, TProjectDynamicData } from "../../schema";
import { TUseProjects } from "./types";

export function useProjects(): TUseProjects {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const createProject = useCallback((values: TProjectDynamicData) => {
    const date = new Date();
    changeDoc((d) => {
      d.projects.push({
        ...values,
        id: crypto.randomUUID(),
        createdAt: date.getTime(),
        tagToTest: [],
        testCases: [],
        allTags: [],
      });
    });
  }, []);

  const removeProject = useCallback((id: string) => {
    changeDoc((d) => {
      const index = d.projects.findIndex((project) => project.id === id);
      delete d.projects[index];
    });
  }, []);

  if (doc === undefined) {
    return {
      data: undefined,
      loading: true,
      createProject,
      removeProject,
    };
  } else {
    return {
      data: doc.projects,
      loading: false,
      createProject,
      removeProject,
    };
  }
}