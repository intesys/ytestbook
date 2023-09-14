import _ from "lodash";
import { ITestcaseModel } from "../../api/models";

export const useTestcase = (
  id: string,
  testcasesData: Array<ITestcaseModel> | undefined
): ITestcaseModel | undefined => {
  return _.find(testcasesData, { id });
};
