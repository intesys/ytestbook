import produce from "immer";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../types";
import TTagsAction from "./actions";
import { ITagsState } from "./types";

const TagsReducer = produce(
  (state: ITagsState, action: TTagsAction): ITagsState => {
    switch (action.type) {
      case "TAG_SET_LOADING":
        state.Tag.status = LOADING_STATUS.LOADING;
        state.Tag.operation = OPERATIONS_ACTIONS.SET;
        break;
      case "TAG_SET_ERROR":
        state.Tag.status = LOADING_STATUS.ERROR;
        state.Tag.operation = OPERATIONS_ACTIONS.SET;
        break;
      case "TAG_SET_SUCCESS":
        state.Tag.status = LOADING_STATUS.SUCCESS;
        state.Tag.operation = OPERATIONS_ACTIONS.SET;
        break;

      case "TAG_GET_LOADING":
        state.Tag.status = LOADING_STATUS.LOADING;
        state.Tag.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "TAG_GET_ERROR":
        state.Tag.status = LOADING_STATUS.ERROR;
        state.Tag.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "TAG_GET_SUCCESS":
        state.Tag.status = LOADING_STATUS.SUCCESS;
        state.Tag.operation = OPERATIONS_ACTIONS.GET;
        state.Tag.item = action.payload;
        break;

      case "TAG_DELETE_LOADING":
        state.Tag.status = LOADING_STATUS.LOADING;
        state.Tag.operation = OPERATIONS_ACTIONS.DELETE;
        break;
      case "TAG_DELETE_ERROR":
        state.Tag.status = LOADING_STATUS.ERROR;
        state.Tag.operation = OPERATIONS_ACTIONS.DELETE;
        break;
      case "TAG_DELETE_SUCCESS":
        state.Tag.status = LOADING_STATUS.SUCCESS;
        state.Tag.operation = OPERATIONS_ACTIONS.DELETE;
        break;

      case "TAGS_GET_LOADING":
        state.Tags.status = LOADING_STATUS.LOADING;
        state.Tags.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "TAGS_GET_ERROR":
        state.Tags.status = LOADING_STATUS.ERROR;
        state.Tags.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "TAGS_GET_SUCCESS":
        state.Tags.status = LOADING_STATUS.SUCCESS;
        state.Tags.operation = OPERATIONS_ACTIONS.GET;
        state.Tags.items = action.payload;
        break;

      case "TAG_RESET":
        state.Tag.item = undefined;
        state.Tag.status = LOADING_STATUS.INIT;
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

export default TagsReducer;
