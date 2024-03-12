export enum StatusEnum {
  FAIL = "FAIL",
  SUCCESS = "SUCCESS",
  IN_PROGRESS = "IN_PROGRESS",
  CANCELED = "CANCELED",
}

export type TSteps = {
  id: string;
  testId: TTest["id"];
  stepStatus: StatusEnum;
  description: string;
  lastEdit: string;
};

export type TTest = {
  id: string;
  caseId: TCase["id"];
  title: string;
  completion: number;
  tags?: string[];
  lastUpdate?: string;
  assignees?: string[];
  testStatus: StatusEnum;
  description?: string;
  steps: TSteps[];
};

export type TComment = {
  id: string;
  testId: TTest["id"];
  username: string;
  createdAt: string;
  testStatusWhenCreated: StatusEnum;
  resolved: boolean;
  content: string;
};

export type TCase = {
  id: string;
  projectId: TProject["id"];
  title: string;
  caseStatus: StatusEnum;
  completion: number;
  jiraLink?: string;
  description?: string;
  tests?: TTest[];
  comments?: TComment[];
};

export type TProjectDynamicData = {
  title: string;
  customer: string;
  lastEdit?: number;
  testCases?: TCase[];
};

export type TProject = {
  id: string;
  createdAt: number;
} & TProjectDynamicData;

export type TDocType = {
  projects: TProject[];
};
