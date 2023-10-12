export type TestbookAdditionalInfo = "client" | "created";

export type TestbookInfo = {
  _id: string;
  id: string;
  name: string;
  description?: string,
  created: string;
} & Record<TestbookAdditionalInfo, string>;
