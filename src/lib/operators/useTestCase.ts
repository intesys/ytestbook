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
    (values: TTestDynamicData & { tags: string[] }) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const testId = crypto.randomUUID();
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        values.tags.forEach((tag) => p?.tagToTest.push([tag, testId]));
        tc?.tests.push({
          title: values.title,
          description: values.description,
          id: testId,
          caseId,
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
    (values: TTestDynamicData & { tags: string[] }, testId: string) => {
      if (!projectId || !caseId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        const t = tc?.tests.find((item) => item.id === testId);
        if (!t || !p) return;

        /**Remove all old testId relationships from tagTotest  */
        p.tagToTest
          .filter(
            (tuple) => tuple[1] === testId && !values.tags.includes(tuple[0]),
          )
          .forEach((tupleToRemove) => {
            const index = p.tagToTest.findIndex((tuple) =>
              tuple.every((value, index) => value === tupleToRemove[index]),
            );
            p.tagToTest.splice(index, 1);
          });

        /**Add new testId releationships */
        const currentTags = p.tagToTest
          .filter((tuple) => tuple[1] === testId)
          .map((tuple) => tuple[0]);
        values.tags
          .filter((tag) => !currentTags.includes(tag))
          .forEach((tag) => p.tagToTest.push([tag, testId]));

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
        if (!tc || !p) return;
        const index = tc.tests.findIndex((test) => test.id === testId);
        tc.tests.splice(index, 1);
        removeTuples(p.tagToTest, (tuple) => tuple[1] === testId);
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
