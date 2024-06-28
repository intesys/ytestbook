import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import slugify from "slugify";
import { useDocContext } from "../../components/docContext/DocContext";
import {
  StatusEnum,
  TCase,
  TCaseDynamicData,
  TCollaborator,
  TCollaboratorDynamicData,
  TDocType,
  TProject,
  TStep,
  TTest,
} from "../../types/schema";
import { downloadFile } from "../helpers/downloadFile";
import { removeTuples } from "../helpers/removeTuples";
import { TUseProject } from "./types";
import { TJsonExport } from "../../types/json-export";
import { NETWORK_URL } from "../..";

export function useProject(projectId: string | undefined): TUseProject {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const project = useMemo(
    () => doc?.projects.find((item) => projectId && item.id === projectId),
    [doc, projectId],
  );

  const getTagsByTestId = useCallback(
    (testId: TTest["id"]) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );
      return (
        project?.tagToTest
          ?.filter((tuple) => tuple[1] === testId)
          .map((tuple) => tuple[0]) || []
      );
    },
    [doc, projectId],
  );

  const getTagsByCaseId = useCallback(
    (caseId: TCase["id"]) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );
      const testCase = project?.testCases.find((item) => item.id === caseId);
      if (!testCase || !project?.tagToTest || !project.allTags) return [];

      const testIdArr = testCase.tests.map((test) => test.id);
      const tags = project.tagToTest
        .filter((tuple) => testIdArr.includes(tuple[1]))
        .map((tuple) => tuple[0]);
      return project.allTags.filter((tag) => tags.includes(tag));
    },
    [doc, projectId],
  );

  const getAssigneesByTestId = useCallback(
    (testId: TTest["id"]) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );
      if (!project?.collaboratorToTest || !project.collaborators) return [];
      const collaboratorsIdArr = project.collaboratorToTest
        .filter((tuple) => tuple[1] === testId)
        .map((tuple) => tuple[0]);
      return project.collaborators.filter((collaborator) =>
        collaboratorsIdArr.includes(collaborator.id),
      );
    },
    [doc, projectId],
  );

  const getAssigneesByCaseId = useCallback(
    (caseId: TCase["id"]) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );
      const testCase = project?.testCases.find((item) => item.id === caseId);
      if (!testCase || !project?.collaboratorToTest || !project.collaborators)
        return [];
      const testIdArr = testCase.tests.map((test) => test.id);
      const collaboratorsIdArr = project.collaboratorToTest
        .filter((tuple) => testIdArr.includes(tuple[1]))
        .map((tuple) => tuple[0]);
      return project.collaborators.filter((collaborator) =>
        collaboratorsIdArr.includes(collaborator.id),
      );
    },
    [doc, projectId],
  );

  const getStatusChangesByStepId = useCallback(
    (stepId: TStep["id"]) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );

      if (!project || !project.statusChanges) {
        return [];
      }

      return project.statusChanges.filter((status) => status.stepId === stepId);
    },
    [doc?.projects, projectId],
  );

  const getCollaborator = useCallback(
    (collaboratorId: TCollaborator["id"]) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );

      if (!project) {
        return undefined;
      }

      return project.collaborators?.find((c) => c.id === collaboratorId);
    },
    [doc?.projects, projectId],
  );

  const exportJSON = () => {
    const project = doc?.projects.find((p) => p.id === projectId);
    if (project) {
      const jsonContent: TJsonExport = {
        networkServerUrl: NETWORK_URL,
        project,
        repoId: docUrl ?? "",
      };

      const parsedData = JSON.stringify(jsonContent);

      const slugifiedTitle = slugify(project.title, {
        lower: true,
      });

      downloadFile(parsedData, `ytestbook-export-${slugifiedTitle}.json`);
    }
  };

  const updateProject = useCallback(
    (data: Partial<Pick<TProject, "title" | "customer" | "description">>) => {
      if (!projectId) return;
      changeDoc((doc) => {
        const project = doc.projects.find(
          (item) => projectId && item.id === projectId,
        );
        if (!project) {
          return;
        }
        if (data.title) {
          project.title = data.title;
        }
        if (data.customer) {
          project.customer = data.customer;
        }
        if (data.description) {
          project.description = data.description;
        }
      });
    },
    [changeDoc, projectId],
  );

  const createTestCase = useCallback(
    (values: TCaseDynamicData) => {
      if (!projectId) return;
      const date = new Date();
      changeDoc((doc) => {
        const project = doc.projects.find(
          (item) => projectId && item.id === projectId,
        );
        project?.testCases.push({
          ...values,
          id: crypto.randomUUID(),
          projectId,
          createdAt: date.getTime(),
          status: StatusEnum.PENDING,
          completion: 0,
          tests: [],
          comments: [],
        });
      });
    },
    [changeDoc, projectId],
  );

  const createCollaborator = useCallback(
    (newCollaborator: TCollaboratorDynamicData) => {
      if (!projectId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        if (!p) return;
        /**@hribeiro TODO: The next line was introduced to keep compatibility with older projects. To be removed*/
        if (!p.collaborators) p.collaborators = [];
        p.collaborators.push({
          ...newCollaborator,
          id: crypto.randomUUID(),
          createdAt: date.getTime(),
        });
        p.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const updateTestCase = useCallback(
    (values: TCaseDynamicData, caseId?: string) => {
      if (!projectId || !caseId) {
        return;
      }

      const date = new Date();

      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );

        const testCase = project?.testCases.find((item) => item.id === caseId);

        if (!testCase) {
          return;
        }

        /**TODO: needs to be enhanced */
        if (values.title) {
          testCase.title = values.title;
        }
        if (values.jiraLink) {
          testCase.jiraLink = values.jiraLink;
        }
        if (values.description) {
          testCase.description = values.description;
        }

        testCase.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const updateTestCaseStatus = useCallback(
    (caseId: string, status: StatusEnum) => {
      if (!projectId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        if (!p || !tc) return;
        tc.status = status;
        p.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const updateAllTags = useCallback(
    (newTags: string[]) => {
      if (!projectId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        if (!p) return;
        if (!p.allTags) p.allTags = [];
        if (!p.tagToTest) p.tagToTest = [];

        /**Remove from state all tags that don't exist in the new state */
        p.allTags
          .filter((tag) => !newTags.includes(tag))
          .forEach((tagToRemove) => {
            const index = p.allTags?.findIndex((tag) => tag === tagToRemove);
            if (index !== undefined) p.allTags?.splice(index, 1);
          });

        /**Add new tags to state  */
        newTags.forEach((tag) => {
          if (!p.allTags?.includes(tag)) p.allTags?.push(tag);
        });

        /**Remove all relationships carrying the key of a removed tag */
        p.tagToTest
          .filter((tuple) => !newTags.includes(tuple[0]))
          .forEach((tupleToRemove) => {
            const index = p.tagToTest?.findIndex((tuple) =>
              tuple.every((value, index) => value === tupleToRemove[index]),
            );
            if (index !== undefined) p.tagToTest?.splice(index, 1);
          });

        p.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const updateCollaborator = useCallback(
    (values: TCollaboratorDynamicData, id?: TCollaborator["id"]) => {
      if (!projectId || !id) {
        return;
      }
      const date = new Date();

      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        /**@hribeiro TODO: The collaborators check was introduced to keep compatibility with older projects. To be removed*/
        if (!project || !project.collaborators) {
          return;
        }

        const collaborator = project.collaborators.find(
          (collaborator) => collaborator.id === id,
        );

        if (!collaborator) {
          return;
        }

        collaborator.name = values.name;
        collaborator.email = values.email;
        project.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const removeCollaborator = useCallback(
    (id: TCollaborator["id"]) => {
      if (!projectId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        if (!p) return;
        /**@hribeiro TODO: The next line was introduced to keep compatibility with older projects. To be removed*/
        if (!p.collaborators) p.collaborators = [];
        const index = p.collaborators.findIndex(
          (collaborator) => collaborator.id === id,
        );
        p.collaborators.splice(index, 1);

        /**@hribeiro TODO: The empty array was introduced to keep compatibility with older projects. To be removed*/
        removeTuples(p.collaboratorToTest || [], (tuple) => tuple[0] === id);
        p.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const removeTestCase = useCallback(
    (testCaseId?: string) => {
      if (!testCaseId) {
        return;
      }

      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );

        if (!project) {
          return;
        }

        const index = project.testCases.findIndex(
          (testCase) => testCase.id === testCaseId,
        );

        delete project.testCases[index];
      });
    },
    [changeDoc, projectId],
  );

  if (project === undefined) {
    return {
      data: undefined,
      loading: true,
      getTagsByTestId,
      getTagsByCaseId,
      getAssigneesByTestId,
      getAssigneesByCaseId,
      getStatusChangesByStepId,
      getCollaborator,
      exportJSON,
      createTestCase,
      createCollaborator,
      updateTestCase,
      updateTestCaseStatus,
      updateAllTags,
      updateCollaborator,
      removeCollaborator,
      removeTestCase,
      updateProject,
    };
  } else {
    return {
      data: project,
      loading: false,
      getTagsByTestId,
      getTagsByCaseId,
      getAssigneesByTestId,
      getAssigneesByCaseId,
      getStatusChangesByStepId,
      getCollaborator,
      exportJSON,
      createTestCase,
      createCollaborator,
      updateTestCase,
      updateTestCaseStatus,
      updateAllTags,
      updateCollaborator,
      removeCollaborator,
      removeTestCase,
      updateProject,
    };
  }
}
