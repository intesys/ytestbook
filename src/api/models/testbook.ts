export interface ITestbookRequest {
  name: string;
  client: string;
}

export interface ITestbookModel {
  _id: string;
  name: string;
  client: string;
  lastEdit: string;
}
