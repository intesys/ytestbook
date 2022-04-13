import { LOADING_STATUS, OPERATIONS_ACTIONS } from "../../types";

export type TTestbookData = {
  id: string;
  name: string;
  description?: string;
  version: string;
};

export interface ITestbookStatus {
  item?: TTestbookData;
  status: LOADING_STATUS;
  operation: OPERATIONS_ACTIONS;
}

export interface ITestbookState {
  testbook: ITestbookStatus;
}
