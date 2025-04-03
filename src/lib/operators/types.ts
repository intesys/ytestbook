import {
  StatusEnum,
  TCase,
  TCaseDynamicData,
  TCollaborator,
  TCollaboratorDynamicData,
  TCommentDynamicData,
  TDocType,
  TProject,
  TProjectDynamicData,
  TStatusChange,
  TStep,
  TStepDynamicData,
  TTest,
  TTestDynamicData,
} from "../../types/schema";

export enum TOperatorLoaderStatus {
  "loading" = "loading",
  "error" = "error",
  "loaded" = "loaded",
}

type TOperatorLoader<T> =
  | {
      status: TOperatorLoaderStatus.loading;
      data: undefined;
      loading: true;
      error: false;
    }
  | {
      status: TOperatorLoaderStatus.error;
      data: undefined;
      loading: false;
      error: true;
    }
  | {
      status: TOperatorLoaderStatus.loaded;
      data: T;
      loading: false;
      error: false;
    };

export type TUseProjects = {
  createProject: (values: TProjectDynamicData) => void;
  removeProject: (projectId?: string) => void;
  updateRepository: (data: { title?: string; description?: string }) => void;
} & TOperatorLoader<TDocType>;

export type TUseProject = {
  getTagsByTestId: (testId: TTest["id"]) => string[];
  getTagsByCaseId: (caseId: TCase["id"]) => string[];
  getAssigneesByTestId: (testId: TTest["id"]) => TCollaborator[];
  getAssigneesByCaseId: (caseId: TCase["id"]) => TCollaborator[];
  getStatusChangesByStepId: (stepId: TStep["id"]) => TStatusChange[];
  getTestsByTags: () => Record<string, TTest[]>;
  getCollaborator: (
    collaboratorId: TCollaborator["id"],
  ) => TCollaborator | undefined;
  exportJSON: () => void;
  createTestCase: (values: TCaseDynamicData) => void;
  createCollaborator: (newCollaborator: TCollaboratorDynamicData) => void;
  updateTestCase: (values: TCaseDynamicData, caseId?: string) => void;
  updateTestCaseStatus: (caseId: string, status: StatusEnum) => void;
  updateAllTags: (allTags: string[]) => void;
  updateCollaborator: (
    values: TCollaboratorDynamicData,
    id?: TCollaborator["id"],
  ) => void;
  removeCollaborator: (id: TCollaborator["id"]) => void;
  removeTestCase: (testCaseId?: string) => void;
  updateProject: (
    data: Partial<Pick<TProject, "title" | "customer" | "description">>,
  ) => void;
} & TOperatorLoader<TProject>;

export type TUseTestCase = {
  createTest: (
    values: TTestDynamicData & { tags: string[]; assignees: string[] },
  ) => void;
  createComment: (
    values: TCommentDynamicData,
    testId?: string,
    stepId?: string,
  ) => void;
  updateCommentResolved: (isResolved: boolean, commentId: string) => void;
  updateTest: (
    values: TTestDynamicData & { tags: string[]; assignees: string[] },
    testId?: string,
  ) => void;
  updateTestDescription: (testId: string, description: string) => void;
  removeTest: (testId?: string) => void;
  removeComment: (commentId: string) => void;
} & TOperatorLoader<TCase>;

export type TUseTest = {
  createStep: (values: TStepDynamicData) => void;
  // updateStepStatus: (
  //   stepId: string,
  //   status: StatusEnum,
  //   collaboratorId?: string,
  //   notes?: string,
  // ) => void;
  updateStepStatuses: (
    stepIds: string[],
    status: StatusEnum,
    collaboratorId?: string,
    notes?: string,
  ) => void;
  removeStep: (stepId: string) => void;
  updateStep: (values: TStepDynamicData, stepId: string) => void;
} & TOperatorLoader<TTest>;

export type TUseStep = TOperatorLoader<TStep>;
