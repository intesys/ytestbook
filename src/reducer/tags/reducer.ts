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
        state.tag.status = LOADING_STATUS.LOADING;
        state.tag.operation = OPERATIONS_ACTIONS.SET;
        break;
      case "TAG_SET_ERROR":
        state.tag.status = LOADING_STATUS.ERROR;
        state.tag.operation = OPERATIONS_ACTIONS.SET;
        break;
      case "TAG_SET_SUCCESS":
        state.tag.status = LOADING_STATUS.SUCCESS;
        state.tag.operation = OPERATIONS_ACTIONS.SET;
        break;

      case "TAG_GET_LOADING":
        state.tag.status = LOADING_STATUS.LOADING;
        state.tag.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "TAG_GET_ERROR":
        state.tag.status = LOADING_STATUS.ERROR;
        state.tag.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "TAG_GET_SUCCESS":
        state.tag.status = LOADING_STATUS.SUCCESS;
        state.tag.operation = OPERATIONS_ACTIONS.GET;
        state.tag.item = action.payload;
        break;

      case "TAG_DELETE_LOADING":
        state.tag.status = LOADING_STATUS.LOADING;
        state.tag.operation = OPERATIONS_ACTIONS.DELETE;
        break;
      case "TAG_DELETE_ERROR":
        state.tag.status = LOADING_STATUS.ERROR;
        state.tag.operation = OPERATIONS_ACTIONS.DELETE;
        break;
      case "TAG_DELETE_SUCCESS":
        state.tag.status = LOADING_STATUS.SUCCESS;
        state.tag.operation = OPERATIONS_ACTIONS.DELETE;
        break;

      case "TAGS_GET_LOADING":
        state.tags.status = LOADING_STATUS.LOADING;
        state.tags.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "TAGS_GET_ERROR":
        state.tags.status = LOADING_STATUS.ERROR;
        state.tags.operation = OPERATIONS_ACTIONS.GET;
        break;
      case "TAGS_GET_SUCCESS":
        state.tags.status = LOADING_STATUS.SUCCESS;
        state.tags.operation = OPERATIONS_ACTIONS.GET;
        state.tags.items = action.payload;
        break;

      case "TAG_RESET":
        state.tag.item = undefined;
        state.tag.status = LOADING_STATUS.INIT;
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
