import { IBaseModel } from ".";

export interface ITestbookRequest {
  name: string;
  client: string;
}

export interface ITestbookModel extends IBaseModel {
  name: string;
  client: string;
  lastEdit: string;
}
