import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import {
  StatusEnum,
  TComment,
  TCommentDynamicData,
  TDocType,
  TTestDynamicData,
} from "../../schema";
import { TUseTestCase } from "./types";
import { removeTuples } from "../helpers/removeTuples";
import { addTuples } from "../helpers/addTuples";

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
        values.assignees.forEach(
          (assigneeId) => p.collaboratorToTest?.push([assigneeId, testId]),
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
    [projectId, caseId],
  );

  const createComment = useCallback(
    (values: TCommentDynamicData, testId?: string, stepId?: string) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        if (!tc) return;

        const newComment: TComment = {
          ...values,
          id: crypto.randomUUID(),
          caseId,
          createdAt: date.getTime(),
          resolved: false,
        };
        if (testId) newComment.testId = testId;
        if (stepId) newComment.stepId = stepId;
        tc.comments.push(newComment);
      });
    },
    [projectId, caseId],
  );

  const updateTest = useCallback(
    (
      values: TTestDynamicData & { tags: string[]; assignees: string[] },
      testId: string,
    ) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        const t = tc?.tests.find((item) => item.id === testId);
        if (!t || !p) return;
        if (!p.tagToTest) p.tagToTest = [];
        if (!p.collaboratorToTest) p.collaboratorToTest = [];
        /**Remove all old testId relationships from tagTotest that are not in 'values'  */
        removeTuples(
          p.tagToTest,
          (tuple) => tuple[1] === testId && !values.tags.includes(tuple[0]),
        );
        /**Add new testId tags releationships */
        addTuples(p.tagToTest || [], testId, values.tags);
        /**Remove all old testId relationships from collaboratorToTest that are not in 'values'  */
        removeTuples(
          p.collaboratorToTest,
          (tuple) =>
            tuple[1] === testId && !values.assignees.includes(tuple[0]),
        );
        /**Add new testId collaborators releationships */
        addTuples(p.collaboratorToTest, testId, values.assignees);
        /**TODO: needs to be enhanced */
        if (values.title) t.title = values.title;
        if (values.description) t.description = values.description;
        t.lastUpdate = date.getTime();
      });
    },
    [projectId, caseId],
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
    [projectId, caseId],
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
    [projectId, caseId],
  );

  const removeTest = useCallback(
    (testId: string) => {
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        if (!tc || !p) return;
        const index = tc.tests.findIndex((test) => test.id === testId);
        tc.tests.splice(index, 1);
        removeTuples(p.tagToTest || [], (tuple) => tuple[1] === testId);
      });
    },
    [projectId, caseId],
  );

  const removeComment = useCallback(
    (commentId: string) => {
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        if (!tc) return;
        const index = tc.comments.findIndex(
          (comment) => comment.id === commentId,
        );
        delete tc.comments[index];
      });
    },
    [projectId, caseId],
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
    };
  }
}
