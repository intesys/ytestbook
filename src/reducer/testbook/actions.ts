import { ITestbookModel, ITestcaseModel } from "../../api/models";

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
  | PostTestcaseError;

export default TYTestbookAction;
