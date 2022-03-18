export enum LOADING_STATUS {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
}

export enum OperationEnum {
  UPDATE,
}

export type TTestbookData = {
  id: string;
  name: string;
  description?: string;
  version: string;
};

export interface ITestbookStatus {
  item?: TTestbookData;
  status: LOADING_STATUS;
}

export interface ITestbookState {
  testbook: ITestbookStatus;
}
