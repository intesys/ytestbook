import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import {
  StatusEnum,
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
          completion: 0,
          tags: [],
          createdAt: date.getTime(),
          assignees: [],
          testStatus: StatusEnum.IDLE,
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
        tc?.comments.push({
          ...values,
          id: crypto.randomUUID(),
          testId,
          caseId,
          createdAt: date.getTime(),
          resolved: false,
        });
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
      removeTest,
      removeComment,
    };
  } else {
    return {
      data: testCase,
      loading: false,
      createTest,
      createComment,
      removeTest,
      removeComment,
    };
  }
}
