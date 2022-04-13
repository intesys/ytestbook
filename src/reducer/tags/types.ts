import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../types";

export type TTagsData = {
  id: string;
  label: string;
};

export interface ITagsAction {
  type: ENTITIES_ACTIONS;
  id?: string;
}

export interface ITagsStatus {
  items?: Array<TTagsData>;
  status: LOADING_STATUS;
  operation: OPERATIONS_ACTIONS;
}

export interface ITagStatus {
  item?: TTagsData;
  status: LOADING_STATUS;
  operation: OPERATIONS_ACTIONS;
}

export interface ITagsState {
  tag: ITagStatus;
  tags: ITagsStatus;
  action: ITagsAction;
}
