import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import slugify from "slugify";
import { useDocContext } from "../../components/docContext/DocContext";
import { TJsonExport } from "../../types/json-export";
import { StatusEnum, TDocType } from "../../types/schema";
import { downloadFile } from "../helpers/downloadFile";
import { removeTuples } from "../helpers/removeTuples";
import { TOperatorLoaderStatus, TUseProject } from "./types";
import { STORAGE_KEYS } from "../constants/localStorageKeys";

export function useProject(projectId: string | undefined): TUseProject {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const project: TUseProject["data"] = useMemo(
    () => doc?.projects.find((item) => projectId && item.id === projectId),
    [doc, projectId],
  );

  const loading = useMemo(() => !doc, [doc]);
  const error = useMemo(() => !!doc && !project, [doc, project]);

  const getTagsByTestId: TUseProject["getTagsByTestId"] = useCallback(
    (testId) => {
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

  const getTagsByCaseId: TUseProject["getTagsByCaseId"] = useCallback(
    (caseId) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );
      const testCase = project?.testCases.find((item) => item.id === caseId);
      if (!testCase || !project?.tagToTest || !project.allTags) {
        return [];
      }

      const testIdArr = testCase.tests.map((test) => test.id);
      const tags = project.tagToTest
        .filter((tuple) => testIdArr.includes(tuple[1]))
        .map((tuple) => tuple[0]);
      return project.allTags.filter((tag) => tags.includes(tag));
    },
    [doc, projectId],
  );

  const getAssigneesByTestId: TUseProject["getAssigneesByTestId"] = useCallback(
    (testId) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );
      if (!project?.collaboratorToTest || !project.collaborators) {
        return [];
      }
      const collaboratorsIdArr = project.collaboratorToTest
        .filter((tuple) => tuple[1] === testId)
        .map((tuple) => tuple[0]);
      return project.collaborators.filter((collaborator) =>
        collaboratorsIdArr.includes(collaborator.id),
      );
    },
    [doc, projectId],
  );

  const getAssigneesByCaseId: TUseProject["getAssigneesByCaseId"] = useCallback(
    (caseId) => {
      const project = doc?.projects.find(
        (item) => projectId && item.id === projectId,
      );
      const testCase = project?.testCases.find((item) => item.id === caseId);
      if (!testCase || !project?.collaboratorToTest || !project.collaborators) {
        return [];
      }
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

  const getStatusChangesByStepId: TUseProject["getStatusChangesByStepId"] =
    useCallback(
      (stepId) => {
        const project = doc?.projects.find(
          (item) => projectId && item.id === projectId,
        );

        if (!project || !project.statusChanges) {
          return [];
        }

        return project.statusChanges.filter(
          (status) => status.stepId === stepId,
        );
      },
      [doc?.projects, projectId],
    );

  const getCollaborator: TUseProject["getCollaborator"] = useCallback(
    (collaboratorId) => {
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

  const exportJSON: TUseProject["exportJSON"] = () => {
    const project = doc?.projects.find((p) => p.id === projectId);
    if (project) {
      const jsonContent: TJsonExport = {
        networkServerUrl: localStorage.getItem(STORAGE_KEYS.SERVERS_CONF) ?? "",
        project,
        repository: {
          id: docUrl ?? "",
          description: doc?.description ?? "",
          title: doc?.title ?? "",
        },
      };

      const parsedData = JSON.stringify(jsonContent);

      const slugifiedTitle = slugify(project.title, {
        lower: true,
      });

      downloadFile(parsedData, `ytestbook-export-${slugifiedTitle}.json`);
    }
  };

  const updateProject: TUseProject["updateProject"] = useCallback(
    (data) => {
      if (!projectId) {
        return;
      }
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

  const createTestCase: TUseProject["createTestCase"] = useCallback(
    (values) => {
      if (!projectId) {
        return;
      }
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

  const createCollaborator: TUseProject["createCollaborator"] = useCallback(
    (newCollaborator) => {
      if (!projectId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        if (!project) {
          return;
        }
        /**@hribeiro TODO: The next line was introduced to keep compatibility with older projects. To be removed*/
        if (!project.collaborators) project.collaborators = [];
        project.collaborators.push({
          ...newCollaborator,
          id: crypto.randomUUID(),
          createdAt: date.getTime(),
        });
        project.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const updateTestCase: TUseProject["updateTestCase"] = useCallback(
    (values, caseId) => {
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

  const updateTestCaseStatus: TUseProject["updateTestCaseStatus"] = useCallback(
    (caseId, status) => {
      if (!projectId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        if (!project || !testCase) {
          return;
        }
        testCase.status = status;
        project.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const updateAllTags: TUseProject["updateAllTags"] = useCallback(
    (newTags) => {
      if (!projectId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        if (!project) {
          return;
        }
        if (!project.allTags) project.allTags = [];
        if (!project.tagToTest) project.tagToTest = [];

        /**Remove from state all tags that don't exist in the new state */
        project.allTags
          .filter((tag) => !newTags.includes(tag))
          .forEach((tagToRemove) => {
            const index = project.allTags?.findIndex(
              (tag) => tag === tagToRemove,
            );
            if (index !== undefined) project.allTags?.splice(index, 1);
          });

        /**Add new tags to state  */
        newTags.forEach((tag) => {
          if (!project.allTags?.includes(tag)) project.allTags?.push(tag);
        });

        /**Remove all relationships carrying the key of a removed tag */
        project.tagToTest
          .filter((tuple) => !newTags.includes(tuple[0]))
          .forEach((tupleToRemove) => {
            const index = project.tagToTest?.findIndex((tuple) =>
              tuple.every((value, index) => value === tupleToRemove[index]),
            );
            if (index !== undefined) project.tagToTest?.splice(index, 1);
          });

        project.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const updateCollaborator: TUseProject["updateCollaborator"] = useCallback(
    (values, id) => {
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

  const removeCollaborator: TUseProject["removeCollaborator"] = useCallback(
    (id) => {
      if (!projectId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        if (!project) {
          return;
        }
        /**@hribeiro TODO: The next line was introduced to keep compatibility with older projects. To be removed*/
        if (!project.collaborators) project.collaborators = [];
        const index = project.collaborators.findIndex(
          (collaborator) => collaborator.id === id,
        );
        project.collaborators.splice(index, 1);

        /**@hribeiro TODO: The empty array was introduced to keep compatibility with older projects. To be removed*/
        removeTuples(
          project.collaboratorToTest || [],
          (tuple) => tuple[0] === id,
        );
        project.lastUpdate = date.getTime();
      });
    },
    [changeDoc, projectId],
  );

  const removeTestCase: TUseProject["removeTestCase"] = useCallback(
    (testCaseId) => {
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

  const methods = useMemo(
    () => ({
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
    }),
    [
      createCollaborator,
      createTestCase,
      exportJSON,
      getAssigneesByCaseId,
      getAssigneesByTestId,
      getCollaborator,
      getStatusChangesByStepId,
      getTagsByCaseId,
      getTagsByTestId,
      removeCollaborator,
      removeTestCase,
      updateAllTags,
      updateCollaborator,
      updateProject,
      updateTestCase,
      updateTestCaseStatus,
    ],
  );

  if (loading) {
    return {
      status: TOperatorLoaderStatus.loading,
      data: undefined,
      loading: true,
      error: false,
      ...methods,
    };
  }

  if (error || !project) {
    return {
      status: TOperatorLoaderStatus.error,
      data: undefined,
      loading: false,
      error: true,
      ...methods,
    };
  }

  return {
    status: TOperatorLoaderStatus.loaded,
    data: project,
    loading: false,
    error: false,
    ...methods,
  };
}
