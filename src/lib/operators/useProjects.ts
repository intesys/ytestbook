import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useDocContext } from "../../components/docContext/DocContext";
import { TDocType, TProject } from "../../types";
import { useCallback } from "react";

export function useProjects() {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const create = useCallback((values: Omit<TProject, "id" | "createdAt">) => {
    const date = new Date();
    changeDoc((d) => {
      d.projects.push({
        ...values,
        id: crypto.randomUUID(),
        createdAt: date.getTime(),
      });
    });
  }, []);

  const remove = useCallback((id: string) => {
    changeDoc((d) => {
      const index = d.projects.findIndex((project) => project.id === id);
      delete d.projects[index];
    });
  }, []);

  return { data: doc?.projects, create, remove };
}
