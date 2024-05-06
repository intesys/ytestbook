export type TestbookAdditionalInfo = "client" | "created";

export type TestbookInfo = {
  id: string;
  name: string;
  description?: string;
  created: string;
} & Record<TestbookAdditionalInfo, string>;
