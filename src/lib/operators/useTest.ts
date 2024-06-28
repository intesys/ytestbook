import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { StatusEnum, TDocType, TStepDynamicData } from "../../types/schema";
import { computeStatus } from "../helpers/computeStatus";
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
        if (!t || !p) return;
        t.steps.push({
          ...values,
          id: crypto.randomUUID(),
          testId,
          status: StatusEnum.PENDING,
          createdAt: date.getTime(),
        });
        t.lastUpdate = p.lastUpdate = date.getTime();
      });
    },
    [projectId, caseId, testId, changeDoc],
  );

  const updateStepStatus = useCallback(
    (stepId: string, status: StatusEnum) => {
      if (!projectId || !caseId || !testId) return;
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        const test = testCase?.tests.find((test) => test.id === testId);
        const step = test?.steps.find((step) => step.id === stepId);
        if (!step || !test || !testCase || !project) return;

        const previousStatus = step.status;

        step.status = status;
        computeStatus(test, test.steps);
        computeStatus(testCase, testCase.tests);
        step.lastUpdate = test.lastUpdate = project.lastUpdate = date.getTime();

        project?.statusChanges.push({
          id: crypto.randomUUID(),
          createdAt: date.getTime(),
          caseId,
          previousStatus,
          stepId,
          targetStatus: status,
          testId,
        });
      });
    },
    [projectId, caseId, testId, changeDoc],
  );

  const updateStep = useCallback(
    (values: TStepDynamicData, stepId: string) => {
      if (!projectId || !caseId || !testId) return;
      const date = new Date();
      changeDoc((d) => {
        const p = d.projects.find((item) => projectId && item.id === projectId);
        const tc = p?.testCases.find((item) => item.id === caseId);
        const t = tc?.tests.find((test) => test.id === testId);
        const s = t?.steps.find((step) => step.id === stepId);
        if (!s || !t || !tc || !p) return;
        s.title = values.title;
        if (values.description) {
          s.description = values.description;
        }
        s.lastUpdate = t.lastUpdate = p.lastUpdate = date.getTime();
      });
    },
    [projectId, caseId, testId, changeDoc],
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
    [changeDoc, projectId, caseId, testId],
  );

  if (test === undefined) {
    return {
      data: undefined,
      loading: true,
      createStep,
      updateStepStatus,
      removeStep,
      updateStep,
    };
  } else {
    return {
      data: test,
      loading: false,
      createStep,
      updateStepStatus,
      removeStep,
      updateStep,
    };
  }
}
