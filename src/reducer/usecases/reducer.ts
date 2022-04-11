import produce from "immer";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../types";
import TUseCasesAction from "./actions";
import { IUseCasesState } from "./types";

const usecasesReducer = produce(
  (state: IUseCasesState, action: TUseCasesAction): IUseCasesState => {
    switch (action.type) {
      case "USECASE_SET_LOADING":
        state.usecase.status = LOADING_STATUS.LOADING;
        state.usecase.operation = OPERATIONS_ACTIONS.SET;
        break;
      case "USECASE_SET_ERROR":
        state.usecase.status = LOADING_STATUS.ERROR;
        state.usecase.operation = OPERATIONS_ACTIONS.SET;
        break;
      case "USECASE_SET_SUCCESS":
        state.usecase.status = LOADING_STATUS.SUCCESS;
        state.usecase.operation = OPERATIONS_ACTIONS.SET;
        break;

      case "USECASE_GET_LOADING":
        state.usecase.status = LOADING_STATUS.LOADING;
        state.usecase.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "USECASE_GET_ERROR":
        state.usecase.status = LOADING_STATUS.ERROR;
        state.usecase.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "USECASE_GET_SUCCESS":
        state.usecase.status = LOADING_STATUS.SUCCESS;
        state.usecase.operation = OPERATIONS_ACTIONS.GET;
        state.usecase.item = action.payload;
        break;

      case "USECASE_DELETE_LOADING":
        state.usecase.status = LOADING_STATUS.LOADING;
        state.usecase.operation = OPERATIONS_ACTIONS.DELETE;
        break;
      case "USECASE_DELETE_ERROR":
        state.usecase.status = LOADING_STATUS.ERROR;
        state.usecase.operation = OPERATIONS_ACTIONS.DELETE;
        break;
      case "USECASE_DELETE_SUCCESS":
        state.usecase.status = LOADING_STATUS.SUCCESS;
        state.usecase.operation = OPERATIONS_ACTIONS.DELETE;
        break;

      case "USECASES_GET_LOADING":
        state.usecases.status = LOADING_STATUS.LOADING;
        state.usecases.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "USECASES_GET_ERROR":
        state.usecases.status = LOADING_STATUS.ERROR;
        state.usecases.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "USECASES_GET_SUCCESS":
        state.usecases.status = LOADING_STATUS.SUCCESS;
        state.usecases.operation = OPERATIONS_ACTIONS.GET;
        state.usecases.items = action.payload;
        break;

      case "USECASE_RESET":
        state.usecase.status = LOADING_STATUS.INIT;
        state.action.type = ENTITIES_ACTIONS.IDLE;
        break;

      case "SET_ACTION":
        state.action.id = action.payload.id;
        state.action.type = action.payload.type;
        break;
    }

    return state;
  }
);

export default usecasesReducer;
