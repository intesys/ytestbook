import _ from "lodash";
import { useYTestbookContext } from "../../context/useYTestbookContext";
import { TestcaseResponse } from "../../generated";

export const useTestcase = (
  id: string,
  testcasesData: Array<TestcaseResponse> | undefined
): TestcaseResponse | undefined => {
  return _.find(testcasesData, { id });
};
