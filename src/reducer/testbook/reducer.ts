import TYTestbookAction from "./actions";
import { produce } from "immer";
import { IYTestbookState } from "./types";
import { LOADING_STATUS } from "../types";

const yTestbookReducer = produce(
  (state: IYTestbookState, action: TYTestbookAction): IYTestbookState => {
    switch (action.type) {
      case "USER_LOGIN_LOADING":
        state.auth.status = LOADING_STATUS.LOADING;
        break;
      case "USER_LOGIN_SUCCESS":
        state.auth.status = LOADING_STATUS.SUCCESS;
        state.auth.data = action.payload;
        break;
      case "USER_LOGIN_ERROR":
        state.auth.status = LOADING_STATUS.ERROR;
        break;

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
    }

    return state;
  }
);

export default yTestbookReducer;
