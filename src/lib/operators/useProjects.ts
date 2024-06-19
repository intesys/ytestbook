import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { TDocType, TProject, TProjectDynamicData } from "../../schema";
import { TUseProjects } from "./types";
import z from "zod";
import { notifications } from "@mantine/notifications";

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

  const importJSON = (fileReaderResult?: FileReader["result"]) => {
    try {
      if (!fileReaderResult || typeof fileReaderResult !== "string") {
        throw Error();
      }

      const parsedData: TProject = JSON.parse(fileReaderResult);

      // Checking parsedData validity

      const schema = z.object({
        id: z.string(),
        testCases: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().optional(),
            projectId: z.string(),
            status: z.string(),
            tests: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().optional(),
                caseId: z.string(),
                status: z.string(),
                steps: z.array(
                  z.object({
                    id: z.string(),
                    title: z.string(),
                    description: z.string().optional(),
                    testId: z.string(),
                    status: z.string(),
                  }),
                ),
              }),
            ),
            comments: z.array(
              z.object({
                id: z.string(),
                resolved: z.boolean(),
                username: z.string(),
                content: z.string(),
              }),
            ),
          }),
        ),
      });

      const isValid = schema.safeParse(parsedData);
      if (!isValid.success) {
        throw new Error();
      }

      const projectNewId = crypto.randomUUID();
      parsedData.id = projectNewId;

      changeDoc((d) => {
        d.projects.push(parsedData);
      });

      return projectNewId;
    } catch (error) {
      notifications.show({
        message: "yTestbook JSON is not valid",
        color: "red",
      });
      return false;
    }
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
