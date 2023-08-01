import { ITestcaseModel } from "../../../api/models";

export interface OverviewProps {
  data?: ITestcaseModel[];
}
export interface OverviewFiltersProps {
  tableId: string;
  data?: ITestcaseModel[];
}
