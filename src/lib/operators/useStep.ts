import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { TDocType } from "../../types/schema";
import { TUseStep } from "./types";

export function useStep(
  projectId: string | undefined,
  caseId: string | undefined,
  testId: string | undefined,
  stepId: string | undefined,
): TUseStep {
  const { docUrl } = useDocContext();
  const [doc] = useDocument<TDocType>(docUrl);

  const step: TUseStep["data"] = useMemo(() => {
    const project = doc?.projects.find(
      (item) => projectId && item.id === projectId,
    );
    const testCase = project?.testCases.find((item) => item.id === caseId);
    const test = testCase?.tests.find((test) => test.id === testId);
    return test?.steps.find((step) => step.id === stepId);
  }, [doc, projectId, caseId, testId, stepId]);

  if (step === undefined) {
    return {
      data: undefined,
      loading: true,
    };
  }

  return {
    data: step,
    loading: false,
  };
}
