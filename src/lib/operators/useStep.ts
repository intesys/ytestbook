import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useMemo } from "react";
import { useDocContext } from "../../components/docContext/DocContext";
import { TDocType } from "../../schema";
import { TUseStep } from "./types";

export function useStep(
  projectId: string | undefined,
  caseId: string | undefined,
  testId: string | undefined,
  stepId: string | undefined,
): TUseStep {
  const { docUrl } = useDocContext();
  const [doc] = useDocument<TDocType>(docUrl);

  const step = useMemo(() => {
    const p = doc?.projects.find((item) => projectId && item.id === projectId);
    const tc = p?.testCases.find((item) => item.id === caseId);
    const t = tc?.tests.find((test) => test.id === testId);
    return t?.steps.find((step) => step.id === stepId);
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
