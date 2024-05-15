export const routesHelper = {
  projectDetail: (projectId: string) => `/project/${projectId}`,
  testCaseDetail: (projectId: string, testCase: string) =>
    `/project/${projectId}/testCase/${testCase}`,
  testDetail: (projectId: string, testCase: string, testId: string) =>
    `/project/${projectId}/testCase/${testCase}/test/${testId}`,
  stepDetail: (
    projectId: string,
    testCase: string,
    testId: string,
    stepId: string,
  ) =>
    `/project/${projectId}/testCase/${testCase}/test/${testId}/step/${stepId}`,
};
