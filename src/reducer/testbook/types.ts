import { IApiResponse } from "../types";

export interface IYTestbookState {
  auth: IApiResponse<LoginResponse>;
  testbooks: IApiResponse<Array<TestbookResponse>>;
  testbook: IApiResponse<TestbookResponse>;
  testcases: IApiResponse<Array<TestcaseResponse>>;
  testcase: IApiResponse<TestcaseResponse>;
}
