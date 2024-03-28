import {
  StatusEnum,
  TCase,
  TCaseDynamicData,
  TCollaborator,
  TCollaboratorDynamicData,
  TCommentDynamicData,
  TProject,
  TProjectDynamicData,
  TStepDynamicData,
  TTest,
  TTestDynamicData,
} from "../../schema";

export type TOperatorLoader<T> =
  | {
      data: undefined;
      loading: true;
    }
  | {
      data: T;
      loading: false;
    };

export type TUseProjects = {
  createProject: (values: TProjectDynamicData) => void;
  removeProject: (projectId: string) => void;
} & TOperatorLoader<TProject[]>;

export type TUseProject = {
  getTagsByTestId: (testId: TTest["id"]) => string[];
  getTagsByCaseId: (caseId: TCase["id"]) => string[];
  getAssigneesByTestId: (testId: TTest["id"]) => TCollaborator[];
  getAssigneesByCaseId: (caseId: TCase["id"]) => TCollaborator[];
  createTestCase: (values: TCaseDynamicData) => void;
  createCollaborator: (newCollaborator: TCollaboratorDynamicData) => void;
  updateTestCase: (values: TCaseDynamicData, caseId: string) => void;
  updateTestCaseStatus: (caseId: string, status: StatusEnum) => void;
  updateAllTags: (allTags: string[]) => void;
  updateCollaborator: (
    values: TCollaboratorDynamicData,
    id: TCollaborator["id"],
  ) => void;
  removeCollaborator: (id: TCollaborator["id"]) => void;
  removeTestCase: (testCaseId: string) => void;
} & TOperatorLoader<TProject>;

export type TUseTestCase = {
  createTest: (
    values: TTestDynamicData & { tags: string[]; assignees: string[] },
  ) => void;
  createComment: (values: TCommentDynamicData, testId?: string) => void;
  updateTest: (
    values: TTestDynamicData & { tags: string[]; assignees: string[] },
    testId: string,
  ) => void;
  updateTestStatus: (testId: string, status: StatusEnum) => void;
  removeTest: (testId: string) => void;
  removeComment: (commentId: string) => void;
} & TOperatorLoader<TCase>;

export type TUseTest = {
  createStep: (values: TStepDynamicData) => void;
  updateStepStatus: (stepId: string, status: StatusEnum) => void;
  removeStep: (stepId: string) => void;
} & TOperatorLoader<TTest>;
