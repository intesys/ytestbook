import { produce } from "immer";
import { LOADING_STATUS } from "../types";
import TYTestbookAction from "./actions";
import { IYTestbookState } from "./types";

const yTestbookReducer = produce(
  (state: IYTestbookState, action: TYTestbookAction): IYTestbookState => {
    switch (action.type) {
      case "GET_TESTBOOKS_LOADING":
        state.testbooks.status = LOADING_STATUS.LOADING;
        break;
      case "GET_TESTBOOKS_SUCCESS":
        state.testbooks.status = LOADING_STATUS.SUCCESS;
        state.testbooks.data = action.payload;
        break;
      case "GET_TESTBOOKS_ERROR":
        state.testbooks.status = LOADING_STATUS.ERROR;
        break;

      case "POST_TESTBOOK_LOADING":
        state.testbook.status = LOADING_STATUS.LOADING;
        break;
      case "POST_TESTBOOK_SUCCESS":
        state.testbook.status = LOADING_STATUS.SUCCESS;
        state.testbook.data = action.payload;
        break;
      case "POST_TESTBOOK_ERROR":
        state.testbook.status = LOADING_STATUS.ERROR;
        break;

      case "GET_TESTCASES_LOADING":
        state.testcases.status = LOADING_STATUS.LOADING;
        break;
      case "GET_TESTCASES_SUCCESS":
        state.testcases.status = LOADING_STATUS.SUCCESS;
        state.testcases.data = action.payload;
        break;
      case "GET_TESTCASES_ERROR":
        state.testcases.status = LOADING_STATUS.ERROR;
        break;

      case "POST_TESTCASE_LOADING":
        state.testcase.status = LOADING_STATUS.LOADING;
        break;
      case "POST_TESTCASE_SUCCESS":
        state.testcase.status = LOADING_STATUS.SUCCESS;
        state.testcase.data = action.payload;
        break;
      case "POST_TESTCASE_ERROR":
        state.testcase.status = LOADING_STATUS.ERROR;
        break;

      
    }

    return state;
  }
);

export default yTestbookReducer;
