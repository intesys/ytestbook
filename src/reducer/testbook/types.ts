export enum LOADING_STATUS {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
}

export enum OperationEnum {
  IDLE,
  SET,
  GET,
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
  operation: OperationEnum;
}

export interface ITestbookState {
  testbook: ITestbookStatus;
}
