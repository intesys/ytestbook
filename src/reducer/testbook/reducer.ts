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
        break;
      case "USER_LOGIN_ERROR":
        state.auth.status = LOADING_STATUS.ERROR;
        break;
    }

    return state;
  }
);

export default yTestbookReducer;
