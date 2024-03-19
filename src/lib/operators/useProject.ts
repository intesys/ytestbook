import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { StatusEnum, TCaseDynamicData, TDocType } from "../../schema";
import { TUseProject } from "./types";

export function useProject(projectId: string | undefined): TUseProject {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const project = useMemo(
    () => doc?.projects.find((item) => projectId && item.id === projectId),
    [doc, projectId],
  );

  const createTestCase = useCallback(
    (values: TCaseDynamicData) => {
      if (!projectId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        p?.testCases.push({
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
    [projectId],
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
    [projectId],
  );

  const removeTestCase = useCallback(
    (testCaseId: string) => {
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        if (!p) return;
        const index = p.testCases.findIndex(
          (testCase) => testCase.id === testCaseId,
        );
        delete p.testCases[index];
      });
    },
    [projectId],
  );

  if (project === undefined) {
    return {
      data: undefined,
      loading: true,
      createTestCase,
      updateTestCaseStatus,
      removeTestCase,
    };
  } else {
    return {
      data: project,
      loading: false,
      createTestCase,
      updateTestCaseStatus,
      removeTestCase,
    };
  }
}
