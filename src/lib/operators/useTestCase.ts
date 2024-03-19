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
    (values: TTestDynamicData) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        tc?.tests.push({
          ...values,
          id: crypto.randomUUID(),
          caseId,
          tags: [],
          createdAt: date.getTime(),
          assignees: [],
          status: StatusEnum.PENDING,
          steps: [],
        });
      });
    },
    [projectId, caseId],
  );

  const createComment = useCallback(
    (values: TCommentDynamicData, testId?: string) => {
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
        tc.comments.push(newComment);
      });
    },
    [projectId, caseId],
  );

  const updateTest = useCallback(
    (values: TTestDynamicData, testId: string) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        const t = tc?.tests.find((item) => item.id === testId);
        if (!t) return;
        /**TODO: needs to be enhanced */
        if (values.title) t.title = values.title;
        if (values.description) t.description = values.description;
        t.lastUpdate = date.getTime();
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
        if (!tc) return;
        const index = tc.tests.findIndex((test) => test.id === testId);
        delete tc.tests[index];
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
      updateTestStatus,
      removeTest,
      removeComment,
    };
  }
}
