import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { TDocType, TProject, TProjectDynamicData } from "../../schema";
import { TUseProjects } from "./types";

export function useProjects(): TUseProjects {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const createProject = useCallback(
    (values: TProjectDynamicData) => {
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
    [changeDoc],
  );

  const removeProject = useCallback(
    (id: string) => {
      changeDoc((d) => {
        const index = d.projects.findIndex((project) => project.id === id);
        d.projects.splice(index, 1);
      });
    },
    [changeDoc],
  );

  const importJSON = (jsonContent: string) => {
    const parsedData: TProject = JSON.parse(jsonContent);

    changeDoc((d) => {
      d.projects.push(parsedData);
    });
  };

  if (doc === undefined) {
    return {
      data: undefined,
      loading: true,
      createProject,
      removeProject,
      importJSON,
    };
  } else {
    return {
      data: doc.projects,
      loading: false,
      createProject,
      removeProject,
      importJSON,
    };
  }
}
