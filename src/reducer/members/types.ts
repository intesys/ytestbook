import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../types";

export type TMembersData = {
  id: string;
  name: string;
  surname: string;
  role?: string;
};

export interface IMembersAction {
  type: ENTITIES_ACTIONS;
  id?: string;
}

export interface IMembersStatus {
  items?: Array<TMembersData>;
  status: LOADING_STATUS;
  operation: OPERATIONS_ACTIONS;
}

export interface IMemberStatus {
  item?: TMembersData;
  status: LOADING_STATUS;
  operation: OPERATIONS_ACTIONS;
}

export interface IMembersState {
  member: IMemberStatus;
  members: IMembersStatus;
  action: IMembersAction;
}
