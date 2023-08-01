import { ITestbookModel, ITestcaseModel, IUserModel } from "../../api/models";

interface GetTestbooksLoading {
  type: "GET_TESTBOOKS_LOADING";
}

interface GetTestbooksSuccess {
  type: "GET_TESTBOOKS_SUCCESS";
  payload: Array<ITestbookModel>;
}

interface GetTestbooksError {
  type: "GET_TESTBOOKS_ERROR";
}

interface PostTestbookLoading {
  type: "POST_TESTBOOK_LOADING";
}

interface PostTestbookSuccess {
  type: "POST_TESTBOOK_SUCCESS";
  payload: ITestbookModel;
}

interface PostTestbookError {
  type: "POST_TESTBOOK_ERROR";
}

interface GetTestcasesLoading {
  type: "GET_TESTCASES_LOADING";
}

interface GetTestcasesSuccess {
  type: "GET_TESTCASES_SUCCESS";
  payload: Array<ITestcaseModel>;
}

interface GetTestcasesError {
  type: "GET_TESTCASES_ERROR";
}

interface PostTestcaseLoading {
  type: "POST_TESTCASE_LOADING";
}

interface PostTestcaseSuccess {
  type: "POST_TESTCASE_SUCCESS";
  payload: ITestcaseModel;
}

interface PostTestcaseError {
  type: "POST_TESTCASE_ERROR";
}

interface GetUsersLoading {
  type: "GET_USERS_LOADING";
}

interface GetUsersSuccess {
  type: "GET_USERS_SUCCESS";
  payload: Array<ITestcaseModel>;
}

interface GetUsersError {
  type: "GET_USERS_ERROR";
}

interface PostUserLoading {
  type: "POST_USER_LOADING";
}

interface PostUSerSuccess {
  type: "POST_USER_SUCCESS";
  payload: IUserModel;
}

interface PostUSerError {
  type: "POST_USER_ERROR";
}

type TYTestbookAction =
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
  | PostTestcaseError
  | GetUsersLoading
  | GetUsersSuccess
  | GetUsersError
  | PostUserLoading
  | PostUSerSuccess
  | PostUSerError;

export default TYTestbookAction;
