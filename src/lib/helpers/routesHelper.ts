export const routesHelper = {
  projectDetail: (serverName: string, projectId: string) =>
    `/server/${serverName}/project/${projectId}`,
  projectDetailEmpty: (serverName: string, projectId: string) =>
    `/server/${serverName}/project/${projectId}/empty`,
  testCaseDetail: (serverName: string, projectId: string, testCase: string) =>
    `/server/${serverName}/project/${projectId}/testCase/${testCase}`,
  testDetail: (
    serverName: string,
    projectId: string,
    testCase: string,
    testId: string,
  ) =>
    `/server/${serverName}/project/${projectId}/testCase/${testCase}/test/${testId}`,
  stepDetail: (
    serverName: string,
    projectId: string,
    testCase: string,
    testId: string,
    stepId: string,
  ) =>
    `/server/${serverName}/project/${projectId}/testCase/${testCase}/test/${testId}/step/${stepId}`,
};
