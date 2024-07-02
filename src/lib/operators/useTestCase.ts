import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import {
  StatusEnum,
  TComment,
  TCommentDynamicData,
  TDocType,
  TTestDynamicData,
} from "../../types/schema";
import { addTuples } from "../helpers/addTuples";
import { removeTuples } from "../helpers/removeTuples";
import { TUseTestCase } from "./types";

export function useTestCase(
  projectId: string | undefined,
  caseId: string | undefined,
): TUseTestCase {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const testCase = useMemo(() => {
    const p = doc?.projects.find((item) => projectId && item.id === projectId);
    return p?.testCases.find((item) => item.id === caseId);
  }, [doc, projectId, caseId]);

  const createTest = useCallback(
    (values: TTestDynamicData & { tags: string[]; assignees: string[] }) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const testId = crypto.randomUUID();
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        if (!p) return;
        /**@hribeiro TODO: The next line was introduced to keep compatibility with older projects. To be removed*/
        if (!p.collaboratorToTest) p.collaboratorToTest = [];
        values.tags.forEach((tag) => p.tagToTest?.push([tag, testId]));
        values.assignees.forEach((assigneeId) =>
          p.collaboratorToTest?.push([assigneeId, testId]),
        );
        tc?.tests.push({
          title: values.title,
          description: values.description,
          id: testId,
          caseId,
          createdAt: date.getTime(),
          status: StatusEnum.PENDING,
          steps: [],
        });
      });
    },
    [projectId, caseId, changeDoc],
  );

  const createComment = useCallback(
    (values: TCommentDynamicData, testId?: string, stepId?: string) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        if (!testCase) return;

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

  const updateTest = useCallback(
    (
      values: TTestDynamicData & { tags: string[]; assignees: string[] },
      testId?: string,
    ) => {
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

  const updateTestDescription = useCallback(
    (testId: string, description: string) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        const t = tc?.tests.find((test) => test.id === testId);
        if (!p || !tc || !t) return;
        t.description = description;
        t.lastUpdate = p.lastUpdate = date.getTime();
      });
    },
    [projectId, caseId, changeDoc],
  );

  const updateTestStatus = useCallback(
    (testId: string, status: StatusEnum) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        const t = tc?.tests.find((test) => test.id === testId);
        if (!p || !tc || !t) return;
        t.status = status;
        t.lastUpdate = p.lastUpdate = date.getTime();
      });
    },
    [projectId, caseId, changeDoc],
  );

  const removeTest = useCallback(
    (testId?: string) => {
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

  const removeComment = useCallback(
    (commentId: string) => {
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

  const updateCommentResolved = useCallback(
    (isResolved: boolean, commentId: string) => {
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        if (!tc) return;
        const comment = tc.comments.find((comment) => comment.id === commentId);
        if (!comment) {
          return;
        }
        comment.resolved = isResolved;
      });
    },
    [changeDoc, projectId, caseId],
  );

  if (testCase === undefined) {
    return {
      data: undefined,
      loading: true,
      createTest,
      createComment,
      updateTest,
      updateTestDescription,
      updateTestStatus,
      removeTest,
      removeComment,
      updateCommentResolved,
    };
  } else {
    return {
      data: testCase,
      loading: false,
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
}
