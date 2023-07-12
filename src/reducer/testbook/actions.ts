import { LoginResponse, TestbookResponse } from "../../generated";

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

type TYTestbookAction =
  | UserLoginLoading
  | UserLoginSuccess
  | UserLoginError
  | GetTestbooksLoading
  | GetTestbooksSuccess
  | GetTestbooksError
  | PostTestbookError
  | PostTestbookLoading
  | PostTestbookSuccess;

export default TYTestbookAction;
