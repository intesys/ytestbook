import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useCallback, useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { StatusEnum, TDocType } from "../../types/schema";
import { computeStatus } from "../helpers/computeStatus";
import { TOperatorLoaderStatus, TUseTest } from "./types";

export function useTest(
  projectId: string | undefined,
  caseId: string | undefined,
  testId: string | undefined,
): TUseTest {
  const { docUrl } = useDocContext();
  const [doc, changeDoc] = useDocument<TDocType>(docUrl);

  const test: TUseTest["data"] = useMemo(() => {
    const project = doc?.projects.find(
      (item) => projectId && item.id === projectId,
    );
    const testCase = project?.testCases.find((item) => item.id === caseId);
    return testCase?.tests.find((test) => test.id === testId);
  }, [doc, projectId, caseId, testId]);

  const loading = useMemo(() => !doc, [doc]);
  const error = useMemo(() => !!doc && !test, [doc, test]);

  const createStep: TUseTest["createStep"] = useCallback(
    (values) => {
      if (!projectId || !caseId || !testId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        const test = testCase?.tests.find((test) => test.id === testId);

        if (!test || !testCase || !project) {
          return;
        }

        test.steps.push({
          ...values,
          id: crypto.randomUUID(),
          testId,
          status: StatusEnum.PENDING,
          createdAt: date.getTime(),
        });
        test.lastUpdate = project.lastUpdate = date.getTime();

        computeStatus(test, test.steps);
        computeStatus(testCase, testCase.tests);
      });
    },
    [projectId, caseId, testId, changeDoc],
  );

  const updateStepStatus: TUseTest["updateStepStatus"] = useCallback(
    (stepId, status, collaboratorId, notes) => {
      if (!projectId || !caseId || !testId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        const test = testCase?.tests.find((test) => test.id === testId);
        const step = test?.steps.find((step) => step.id === stepId);
        if (!step || !test || !testCase || !project) {
          return;
        }

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
          collaboratorId,
          notes,
        });
      });
    },
    [projectId, caseId, testId, changeDoc],
  );

  const updateStep: TUseTest["updateStep"] = useCallback(
    (values, stepId) => {
      if (!projectId || !caseId || !testId) {
        return;
      }
      const date = new Date();
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        const test = testCase?.tests.find((test) => test.id === testId);
        const step = test?.steps.find((step) => step.id === stepId);
        if (!step || !test || !testCase || !project) {
          return;
        }
        step.title = values.title;
        if (values.description) {
          step.description = values.description;
        }
        step.lastUpdate = test.lastUpdate = project.lastUpdate = date.getTime();
      });
    },
    [projectId, caseId, testId, changeDoc],
  );

  const removeStep: TUseTest["removeStep"] = useCallback(
    (stepId) => {
      changeDoc((d) => {
        const project = d.projects.find(
          (item) => projectId && item.id === projectId,
        );
        const testCase = project?.testCases.find((item) => item.id === caseId);
        const test = testCase?.tests.find((test) => test.id === testId);
        if (!test || !testCase) {
          return;
        }
        const index = test.steps.findIndex((step) => step.id === stepId);
        delete test.steps[index];

        computeStatus(test, test.steps);
        computeStatus(testCase, testCase.tests);
      });
    },
    [changeDoc, projectId, caseId, testId],
  );

  if (loading) {
    return {
      status: TOperatorLoaderStatus.loading,
      data: undefined,
      loading: true,
      error: false,
      createStep,
      updateStepStatus,
      removeStep,
      updateStep,
    };
  }

  if (error || !test) {
    return {
      status: TOperatorLoaderStatus.error,
      data: undefined,
      loading: false,
      error: true,
      createStep,
      updateStepStatus,
      removeStep,
      updateStep,
    };
  }

  return {
    status: TOperatorLoaderStatus.loaded,
    data: test,
    loading: false,
    error: false,
    createStep,
    updateStepStatus,
    removeStep,
    updateStep,
  };
}
