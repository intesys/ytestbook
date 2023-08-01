import { IBaseModel, ITestModel, StatusEnum } from ".";

export interface ITestcaseModel extends IBaseModel {
  title: string;
  status: StatusEnum;
  requirements?: string;
  description?: string;
  startDate?: number;
  endDate?: number;
  lastEditDate?: number;
  test?: Array<ITestModel>;
  tag?: Array<string>;
  user?: Array<string>;
}
