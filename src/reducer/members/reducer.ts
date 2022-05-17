import produce from "immer";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../types";
import TMembersAction from "./actions";
import { IMembersState } from "./types";

const membersReducer = produce(
  (state: IMembersState, action: TMembersAction): IMembersState => {
    switch (action.type) {
      case "MEMBER_SET_LOADING":
        state.member.status = LOADING_STATUS.LOADING;
        state.member.operation = OPERATIONS_ACTIONS.SET;
        break;
      case "MEMBER_SET_ERROR":
        state.member.status = LOADING_STATUS.ERROR;
        state.member.operation = OPERATIONS_ACTIONS.SET;
        break;
      case "MEMBER_SET_SUCCESS":
        state.member.status = LOADING_STATUS.SUCCESS;
        state.member.operation = OPERATIONS_ACTIONS.SET;
        break;

      case "MEMBER_GET_LOADING":
        state.member.status = LOADING_STATUS.LOADING;
        state.member.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "MEMBER_GET_ERROR":
        state.member.status = LOADING_STATUS.ERROR;
        state.member.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "MEMBER_GET_SUCCESS":
        state.member.status = LOADING_STATUS.SUCCESS;
        state.member.operation = OPERATIONS_ACTIONS.GET;
        state.member.item = action.payload;
        break;

      case "MEMBER_DELETE_LOADING":
        state.member.status = LOADING_STATUS.LOADING;
        state.member.operation = OPERATIONS_ACTIONS.DELETE;
        break;
      case "MEMBER_DELETE_ERROR":
        state.member.status = LOADING_STATUS.ERROR;
        state.member.operation = OPERATIONS_ACTIONS.DELETE;
        break;
      case "MEMBER_DELETE_SUCCESS":
        state.member.status = LOADING_STATUS.SUCCESS;
        state.member.operation = OPERATIONS_ACTIONS.DELETE;
        break;

      case "MEMBERS_GET_LOADING":
        state.members.status = LOADING_STATUS.LOADING;
        state.members.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "MEMBERS_GET_ERROR":
        state.members.status = LOADING_STATUS.ERROR;
        state.members.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "MEMBERS_GET_SUCCESS":
        state.members.status = LOADING_STATUS.SUCCESS;
        state.members.operation = OPERATIONS_ACTIONS.GET;
        state.members.items = action.payload;
        break;

      case "MEMBER_RESET":
        state.member.item = undefined;
        state.member.status = LOADING_STATUS.INIT;
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

export default membersReducer;
