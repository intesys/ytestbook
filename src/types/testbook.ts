type TestbookAdditionalInfo = "client" | "created";

export type TestbookInfo = {
  _id: string;
  type: TYPE.INFO;
  name: string;
  slug: string;
  created: string;
} & Record<TestbookAdditionalInfo, string>;

export enum TYPE {
  INFO,
  USE_CASE,
  TEST,
  STEP
}