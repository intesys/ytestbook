import { LoginResponse, TestbookResponse, TestcaseResponse } from "../../generated";

interface UserLoginLoading {
  type: "USER_LOGIN_LOADING";
}

interface UserLoginSuccess {
  type: "USER_LOGIN_SUCCESS";
  payload: LoginResponse;
}

interface UserLoginError {
  type: "USER_LOGIN_ERROR";
}

interface GetTestbooksLoading {
  type: "GET_TESTBOOKS_LOADING";
}

interface GetTestbooksSuccess {
  type: "GET_TESTBOOKS_SUCCESS";
  payload: Array<TestbookResponse>;
}

interface GetTestbooksError {
  type: "GET_TESTBOOKS_ERROR";
}

interface PostTestbookLoading {
  type: "POST_TESTBOOK_LOADING";
}

interface PostTestbookSuccess {
  type: "POST_TESTBOOK_SUCCESS";
  payload: TestbookResponse;
}

interface PostTestbookError {
  type: "POST_TESTBOOK_ERROR";
}

interface GetTestcasesLoading {
  type: "GET_TESTCASES_LOADING";
}

interface GetTestcasesSuccess {
  type: "GET_TESTCASES_SUCCESS";
  payload: Array<TestcaseResponse>;
}

interface GetTestcasesError {
  type: "GET_TESTCASES_ERROR";
}

interface PostTestcaseLoading {
  type: "POST_TESTCASE_LOADING";
}

interface PostTestcaseSuccess {
  type: "POST_TESTCASE_SUCCESS";
  payload: TestbookResponse;
}

interface PostTestcaseError {
  type: "POST_TESTCASE_ERROR";
}

type TYTestbookAction =
  | UserLoginLoading
  | UserLoginSuccess
  | UserLoginError
  | GetTestbooksLoading
  | GetTestbooksSuccess
  | GetTestbooksError
  | PostTestbookError
  | PostTestbookLoading
  | PostTestbookSuccess
  | GetTestcasesLoading
  | GetTestcasesSuccess
  | GetTestcasesError
  | PostTestcaseLoading
  | PostTestcaseSuccess
  | PostTestcaseError;

export default TYTestbookAction;
