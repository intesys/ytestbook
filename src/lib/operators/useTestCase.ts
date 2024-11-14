import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { StatusEnum, TComment, TDocType } from "../../types/schema";
import { addTuples } from "../helpers/addTuples";
import { computeStatus } from "../helpers/computeStatus.ts";
import { removeTuples } from "../helpers/removeTuples";
import { TOperatorLoaderStatus, TUseTestCase } from "./types";

export function useTestCase(
  projectId: string | undefined,
  caseId: string | undefined,
): TUseTestCase {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const testCase: TUseTestCase["data"] = useMemo(() => {
    const p = doc?.projects.find((item) => projectId && item.id === projectId);
    return p?.testCases.find((item) => item.id === caseId);
  }, [doc, projectId, caseId]);

  const loading = useMemo(() => !doc, [doc]);
  const error = useMemo(() => !!doc && !testCase, [doc, testCase]);

  const createTest: TUseTestCase["createTest"] = useCallback(
    (values) => {
      if (!projectId || !caseId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const testId = crypto.randomUUID();
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);

        if (!project || !testCase) {
          return;
        }

        /**@hribeiro TODO: The next line was introduced to keep compatibility with older projects. To be removed*/
        if (!project.collaboratorToTest) project.collaboratorToTest = [];

        values.tags.forEach((tag) => project.tagToTest?.push([tag, testId]));

        values.assignees.forEach((assigneeId) =>
          project.collaboratorToTest?.push([assigneeId, testId]),
        );

        testCase?.tests.push({
          title: values.title,
          description: values.description,
          id: testId,
          caseId,
          createdAt: date.getTime(),
          status: StatusEnum.PENDING,
          steps: [],
        });

        computeStatus(testCase, testCase.tests);
      });
    },
    [projectId, caseId, changeDoc],
  );

  const createComment: TUseTestCase["createComment"] = useCallback(
    (values, testId, stepId) => {
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

        const test = testCase?.tests.find((item) => item.id === testId);
        const step = test?.steps.find((item) => item.id === stepId);

        const newComment: TComment = {
          ...values,
          id: crypto.randomUUID(),
          caseId,
          createdAt: date.getTime(),
          resolved: false,
          testStatusWhenCreated: testCase.status,
        };
        if (testId) {
          newComment.testId = testId;
          newComment.testStatusWhenCreated = test?.status;
        }
        if (stepId) {
          newComment.stepId = stepId;
          newComment.testStatusWhenCreated = step?.status;
        }

        testCase.comments.push(newComment);
      });
    },
    [projectId, caseId, changeDoc],
  );

  const updateTest: TUseTestCase["updateTest"] = useCallback(
    (values, testId) => {
      if (!projectId || !caseId || !testId) {
        return;
      }

      const date = new Date();

      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        const test = testCase?.tests.find((item) => item.id === testId);

        if (!test || !project) {
          return;
        }

        if (!project.tagToTest) {
          project.tagToTest = [];
        }

        if (!project.collaboratorToTest) {
          project.collaboratorToTest = [];
        }

        /**Remove all old testId relationships from tagTotest that are not in 'values'  */
        removeTuples(
          project.tagToTest,
          (tuple) => tuple[1] === testId && !values.tags.includes(tuple[0]),
        );
        /**Add new testId tags releationships */
        addTuples(project.tagToTest || [], testId, values.tags);
        /**Remove all old testId relationships from collaboratorToTest that are not in 'values'  */
        removeTuples(
          project.collaboratorToTest,
          (tuple) =>
            tuple[1] === testId && !values.assignees.includes(tuple[0]),
        );
        /**Add new testId collaborators releationships */
        addTuples(project.collaboratorToTest, testId, values.assignees);
        /**TODO: needs to be enhanced */
        if (values.title) {
          test.title = values.title;
        }
        if (values.description) {
          test.description = values.description;
        }
        test.lastUpdate = date.getTime();
      });
    },
    [projectId, caseId, changeDoc],
  );

  const updateTestDescription: TUseTestCase["updateTestDescription"] =
    useCallback(
      (testId, description) => {
        if (!projectId || !caseId) {
          return;
        }
        const date = new Date();
        changeDoc((d) => {
          const project = d.projects.find(
            (item) => projectId && item.id === projectId,
          );
          const testCase = project?.testCases.find(
            (item) => item.id === caseId,
          );
          const test = testCase?.tests.find((test) => test.id === testId);
          if (!project || !testCase || !test) {
            return;
          }
          test.description = description;
          test.lastUpdate = project.lastUpdate = date.getTime();
        });
      },
      [projectId, caseId, changeDoc],
    );

  const updateTestStatus: TUseTestCase["updateTestStatus"] = useCallback(
    (testId, status) => {
      if (!projectId || !caseId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        const test = testCase?.tests.find((test) => test.id === testId);
        if (!project || !testCase || !test) {
          return;
        }
        test.status = status;
        test.lastUpdate = project.lastUpdate = date.getTime();
      });
    },
    [projectId, caseId, changeDoc],
  );

  const removeTest: TUseTestCase["removeTest"] = useCallback(
    (testId) => {
      if (!testId) {
        return;
      }

      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        if (!testCase || !project) {
          return;
        }
        const index = testCase.tests.findIndex((test) => test.id === testId);
        testCase.tests.splice(index, 1);
        removeTuples(project.tagToTest ?? [], (tuple) => tuple[1] === testId);
      });
    },
    [changeDoc, projectId, caseId],
  );

  const removeComment: TUseTestCase["removeComment"] = useCallback(
    (commentId) => {
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);

        if (!testCase) {
          return;
        }

        const index = testCase.comments.findIndex(
          (comment) => comment.id === commentId,
        );

        delete testCase.comments[index];
      });
    },
    [changeDoc, projectId, caseId],
  );

  const updateCommentResolved: TUseTestCase["updateCommentResolved"] =
    useCallback(
      (isResolved, commentId) => {
        changeDoc((d) => {
          const project = d.projects.find(
            (item) => projectId && item.id === projectId,
          );
          const testCase = project?.testCases.find(
            (item) => item.id === caseId,
          );
          if (!testCase) {
            return;
          }
          const comment = testCase.comments.find(
            (comment) => comment.id === commentId,
          );
          if (!comment) {
            return;
          }
          comment.resolved = isResolved;
        });
      },
      [changeDoc, projectId, caseId],
    );

  const sharedMethods = useMemo(
    () => ({
      createTest,
      createComment,
      updateTest,
      updateTestDescription,
      updateTestStatus,
      removeTest,
      removeComment,
      updateCommentResolved,
    }),
    [
      createComment,
      createTest,
      removeComment,
      removeTest,
      updateCommentResolved,
      updateTest,
      updateTestDescription,
      updateTestStatus,
    ],
  );

  if (loading) {
    return {
      status: TOperatorLoaderStatus.loading,
      data: undefined,
      loading: true,
      error: false,
      ...sharedMethods,
    };
  }

  if (error || !testCase) {
    return {
      status: TOperatorLoaderStatus.error,
      data: undefined,
      loading: false,
      error: true,
      ...sharedMethods,
    };
  }

  return {
    status: TOperatorLoaderStatus.loaded,
    data: testCase,
    loading: false,
    error: false,
    createTest,
    createComment,
    updateTest,
    updateTestDescription,
    updateTestStatus,
    removeTest,
    removeComment,
    updateCommentResolved,
  };
}
