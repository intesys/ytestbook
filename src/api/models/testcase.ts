import { StatusEnum, ITagModel, ITestModel } from ".";

export interface ITestcaseModel {
  _id: string;
  title: string;
  status: StatusEnum;
  requirements?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  test?: Array<ITestModel>;
  tag?: Array<ITagModel>;
}