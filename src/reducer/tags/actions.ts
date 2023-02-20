import { ITagsAction, TTagsData } from "./types";

interface ActionError {
  error?: any;
}

interface SetTagLoading {
  type: "TAG_SET_LOADING";
}

interface SetTagError extends ActionError {
  type: "TAG_SET_ERROR";
}

interface SetTagSuccess {
  type: "TAG_SET_SUCCESS";
}

interface GetTagLoading {
  type: "TAG_GET_LOADING";
}

interface GetTagError extends ActionError {
  type: "TAG_GET_ERROR";
}

interface GetTagSuccess {
  type: "TAG_GET_SUCCESS";
  payload: TTagsData;
}

interface GetTagsLoading {
  type: "TAGS_GET_LOADING";
}

interface GetTagsError extends ActionError {
  type: "TAGS_GET_ERROR";
}

interface GetTagsSuccess {
  type: "TAGS_GET_SUCCESS";
  payload: Array<TTagsData>;
}

interface DeleteTagLoading {
  type: "TAG_DELETE_LOADING";
}

interface DeleteTagError extends ActionError {
  type: "TAG_DELETE_ERROR";
}

interface DeleteTagSuccess {
  type: "TAG_DELETE_SUCCESS";
}

interface ResetTag {
  type: "TAG_RESET";
}

interface SetAction {
  type: "SET_ACTION";
  payload: ITagsAction;
}

type TTagsAction =
  | SetTagLoading
  | SetTagError
  | SetTagSuccess
  | GetTagLoading
  | GetTagError
  | GetTagSuccess
  | GetTagsLoading
  | GetTagsError
  | GetTagsSuccess
  | DeleteTagLoading
  | DeleteTagError
  | DeleteTagSuccess
  | ResetTag
  | SetAction;

export default TTagsAction;
