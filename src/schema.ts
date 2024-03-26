export enum StatusEnum {
  BLOCKED = "BLOCKED",
  CANCELLED = "CANCELLED",
  DONE = "DONE",
  FAIL = "FAIL",
  PAUSED = "PAUSED",
  PENDING = "PENDING",
  TODO = "TODO",
}

export type TStepDynamicData = {
  description: string;
};

export type TStep = {
  id: string;
  testId: TTest["id"];
  status: StatusEnum;
  lastUpdate?: number;
  createdAt: number;
} & TStepDynamicData;

export type TTestDynamicData = {
  title: string;
  description?: string;
};

export type TTest = {
  id: string;
  caseId: TCase["id"];
  createdAt: number;
  lastUpdate?: number;
  assignees: string[];
  status: StatusEnum;
  steps: TStep[];
} & TTestDynamicData;

export type TCommentDynamicData = {
  username: string;
  content: string;
};

export type TComment = {
  id: string;
  caseId: TCase["id"];
  testId?: TTest["id"];
  createdAt: number;
  testStatusWhenCreated?: StatusEnum;
  resolved: boolean;
} & TCommentDynamicData;

export type TCaseDynamicData = {
  title: string;
  jiraLink?: string;
  description?: string;
};

export type TCase = {
  id: string;
  projectId: TProject["id"];
  status: StatusEnum;
  createdAt: number;
  completion: number;
  lastUpdate?: number;
  tests: TTest[];
  comments: TComment[];
} & TCaseDynamicData;

export type TCollaboratorDynamicData = {
  name: string;
  email: string;
};

export type TCollaborator = {
  id: string;
  createdAt: number;
} & TCollaboratorDynamicData;

export type TProjectDynamicData = {
  title: string;
  customer: string;
  lastUpdate?: number;
};

export type TProject = {
  id: string;
  createdAt: number;
  testCases: TCase[];
  allTags: string[];
  collaborators:
    | TCollaborator[]
    | undefined /**@hribeiro TODO: undefined for compatibility. To be removed */;
  tagToTest: [string, string][];
  collaboratorToTest: [string, string][] | undefined;
} & TProjectDynamicData;

export type TDocType = {
  projects: TProject[];
};
