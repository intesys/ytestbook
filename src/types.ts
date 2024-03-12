export type TFormInitialValues = Record<string, TFormInitialValuesTypes>;

export type TFormInitialValuesTypes =
  | any
  | string
  | number
  | boolean
  | undefined
  | TFormMultipleFields;

export type TFormMultipleFields = Array<Record<string, string>>;

export type TInputVariant = "light" | "blue";

export type TProjectDynamicData = {
  title: string;
  customer: string;
  lastEdit?: number;
};

export type TProject = {
  createdAt: number;
  id: string;
} & TProjectDynamicData;

export type TDocType = {
  projects: Array<TProject>;
};
