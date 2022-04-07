import produce from "immer";
import TTestbookAction from "./actions";
import { ITestbookState, LOADING_STATUS, OperationEnum } from "./types";

const testbookReducer = produce(
  (state: ITestbookState, action: TTestbookAction): ITestbookState => {
    switch (action.type) {
      case "TESTBOOK_RELOAD":
        state.testbook.status = LOADING_STATUS.RELOAD;
        break;

      case "TESTBOOK_SET_LOADING":
        state.testbook.status = LOADING_STATUS.LOADING;
        state.testbook.operation = OperationEnum.SET;
        break;
      case "TESTBOOK_SET_ERROR":
        state.testbook.status = LOADING_STATUS.ERROR;
        state.testbook.operation = OperationEnum.SET;
        break;
      case "TESTBOOK_SET_SUCCESS":
        state.testbook.status = LOADING_STATUS.SUCCESS;
        state.testbook.operation = OperationEnum.SET;
        break;

      case "TESTBOOK_GET_LOADING":
        state.testbook.status = LOADING_STATUS.LOADING;
        state.testbook.operation = OperationEnum.GET;
        break;
      case "TESTBOOK_GET_ERROR":
        state.testbook.status = LOADING_STATUS.ERROR;
        state.testbook.operation = OperationEnum.GET;
        break;
      case "TESTBOOK_GET_SUCCESS":
        state.testbook.status = LOADING_STATUS.SUCCESS;
        state.testbook.operation = OperationEnum.GET;
        state.testbook.item = action.payload;
        break;
    }

    return state;
  }
);

export default testbookReducer;
