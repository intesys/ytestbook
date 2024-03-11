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

export type TProject = {
  createdAt: number;
  id: string;
  name: string;
};

export type TDocType = {
  projects: Array<TProject>;
};
