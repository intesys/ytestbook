import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { StatusEnum, TDocType, TStepDynamicData } from "../../schema";
import { TUseTest } from "./types";

export function useTest(
  projectId: string | undefined,
  caseId: string | undefined,
  testId: string | undefined,
): TUseTest {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const test = useMemo(() => {
    const p = doc?.projects.find((item) => projectId && item.id === projectId);
    const tc = p?.testCases.find((item) => item.id === caseId);
    return tc?.tests.find((test) => test.id === testId);
  }, [doc, projectId, caseId, testId]);

  const createStep = useCallback(
    (values: TStepDynamicData) => {
      if (!projectId || !caseId || !testId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        const t = tc?.tests.find((test) => test.id === testId);
        t?.steps.push({
          ...values,
          id: crypto.randomUUID(),
          testId,
          stepStatus: StatusEnum.IDLE,
          createdAt: date.getTime(),
        });
      });
    },
    [projectId, caseId, testId],
  );

  const removeStep = useCallback(
    (stepId: string) => {
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        const t = tc?.tests.find((test) => test.id === testId);
        if (!t) return;
        const index = t.steps.findIndex((step) => step.id === stepId);
        delete t.steps[index];
      });
    },
    [projectId, caseId, testId],
  );

  if (test === undefined) {
    return {
      data: undefined,
      loading: true,
      createStep,
      removeStep,
    };
  } else {
    return {
      data: test,
      loading: false,
      createStep,
      removeStep,
    };
  }
}
