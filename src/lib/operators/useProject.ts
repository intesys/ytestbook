import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { StatusEnum, TCaseDynamicData, TDocType, TProject } from "../../schema";
import { useDocContext } from "../../components/docContext/DocContext";
import { useCallback, useMemo } from "react";

type TUseProject = {
  removeTestCase: (testCaseId: string) => void;
  createTestCase: (values: TCaseDynamicData) => void;
} & (
  | {
      data: undefined;
      loading: true;
    }
  | {
      data: TProject;
      loading: false;
    }
);

export function useProject(projectId: string | undefined): TUseProject {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const project = useMemo(
    () => doc?.projects.find((item) => projectId && item.id === projectId),
    [doc],
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
          caseStatus: StatusEnum.IDLE,
          completion: 0,
          tests: [],
          comments: [],
        });
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
      removeTestCase,
    };
  } else {
    return {
      data: project,
      loading: false,
      createTestCase,
      removeTestCase,
    };
  }
}
