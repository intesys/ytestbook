import { StatusEnum, ITagModel } from ".";

export interface ITestModel {
  _id: string;
  title: string;
  status: StatusEnum;
  description?: string;
  requirements?: string;
  input?: string;
  output?: string;
  tag?: Array<ITagModel>;
}