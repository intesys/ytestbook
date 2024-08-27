import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { TDocType } from "../../types/schema";
import { TUseProjects } from "./types";

export function useProjects(): TUseProjects {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const createProject: TUseProjects["createProject"] = useCallback(
    (values) => {
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

  const updateRepository: TUseProjects["updateRepository"] = (data) => {
    changeDoc((d) => {
      if (data.title) {
        d.title = data.title;
      }
      if (data.description) {
        d.description = data.description;
      }
    });
  };

  const removeProject: TUseProjects["removeProject"] = useCallback(
    (id) => {
      if (!id) {
        return;
      }

      changeDoc((d) => {
        const index = d.projects.findIndex((project) => project.id === id);
        d.projects.splice(index, 1);
      });
    },
    [changeDoc],
  );

  if (doc === undefined) {
    return {
      data: undefined,
      loading: true,
      createProject,
      updateRepository,
      removeProject,
    };
  } else {
    return {
      data: doc,
      loading: false,
      createProject,
      updateRepository,
      removeProject,
    };
  }
}
