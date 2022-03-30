import { TTestbookData } from "./types";

interface ActionError {
  error?: any;
}

interface SetTestbookLoading {
  type: "TESTBOOK_SET_LOADING";
}

interface SetTestbookError extends ActionError {
  type: "TESTBOOK_SET_ERROR";
}

interface SetTestbookSuccess {
  type: "TESTBOOK_SET_SUCCESS";
}

interface GetTestbookLoading {
  type: "TESTBOOK_GET_LOADING";
}

interface GetTestbookError extends ActionError {
  type: "TESTBOOK_GET_ERROR";
}

interface GetTestbookSuccess {
  type: "TESTBOOK_GET_SUCCESS";
  payload: TTestbookData;
}

interface SetTestbookReload {
  type: "TESTBOOK_RELOAD";
}

type TTestbookAction =
  | SetTestbookLoading
  | SetTestbookError
  | SetTestbookSuccess
  | GetTestbookLoading
  | GetTestbookError
  | GetTestbookSuccess
  | SetTestbookReload;

export default TTestbookAction;
