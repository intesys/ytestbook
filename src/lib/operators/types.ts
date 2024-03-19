import {
  StatusEnum,
  TCase,
  TCaseDynamicData,
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
  createTestCase: (values: TCaseDynamicData) => void;
  updateTestCaseStatus: (caseId: string, status: StatusEnum) => void;
  removeTestCase: (testCaseId: string) => void;
} & TOperatorLoader<TProject>;

export type TUseTestCase = {
  createTest: (values: TTestDynamicData) => void;
  createComment: (values: TCommentDynamicData, testId?: string) => void;
  updateTestStatus: (testId: string, status: StatusEnum) => void;
  removeTest: (testId: string) => void;
  removeComment: (commentId: string) => void;
} & TOperatorLoader<TCase>;

export type TUseTest = {
  createStep: (values: TStepDynamicData) => void;
  updateStepStatus: (stepId: string, status: StatusEnum) => void;
  removeStep: (stepId: string) => void;
} & TOperatorLoader<TTest>;
