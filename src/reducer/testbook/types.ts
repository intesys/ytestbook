import { ITestbookModel, ITestcaseModel } from "../../api/models";
import { IApiResponse } from "../types";

export interface IYTestbookState {
  testbooks: IApiResponse<Array<ITestbookModel>>;
  testbook: IApiResponse<ITestbookModel>;
  testcases: IApiResponse<Array<ITestcaseModel>>;
  testcase: IApiResponse<ITestcaseModel>;
}
