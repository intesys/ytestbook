import { IBaseModel, ITagModel, StatusEnum } from ".";

export interface ITestModel extends IBaseModel {
  title: string;
  status: StatusEnum;
  description?: string;
  requirements?: string;
  input?: string;
  output?: string;
  tag?: Array<ITagModel>;
}
