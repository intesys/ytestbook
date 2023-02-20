import { IMembersAction, TMembersData } from "./types";

interface ActionError {
  error?: any;
}

interface SetMemberLoading {
  type: "MEMBER_SET_LOADING";
}

interface SetMemberError extends ActionError {
  type: "MEMBER_SET_ERROR";
}

interface SetMemberSuccess {
  type: "MEMBER_SET_SUCCESS";
}

interface GetMemberLoading {
  type: "MEMBER_GET_LOADING";
}

interface GetMemberError extends ActionError {
  type: "MEMBER_GET_ERROR";
}

interface GetMemberSuccess {
  type: "MEMBER_GET_SUCCESS";
  payload: TMembersData;
}

interface GetMembersLoading {
  type: "MEMBERS_GET_LOADING";
}

interface GetMembersError extends ActionError {
  type: "MEMBERS_GET_ERROR";
}

interface GetMembersSuccess {
  type: "MEMBERS_GET_SUCCESS";
  payload: Array<TMembersData>;
}

interface DeleteMemberLoading {
  type: "MEMBER_DELETE_LOADING";
}

interface DeleteMemberError extends ActionError {
  type: "MEMBER_DELETE_ERROR";
}

interface DeleteMemberSuccess {
  type: "MEMBER_DELETE_SUCCESS";
}

interface ResetMember {
  type: "MEMBER_RESET";
}

interface SetAction {
  type: "SET_ACTION";
  payload: IMembersAction;
}

type TMembersAction =
  | SetMemberLoading
  | SetMemberError
  | SetMemberSuccess
  | GetMemberLoading
  | GetMemberError
  | GetMemberSuccess
  | GetMembersLoading
  | GetMembersError
  | GetMembersSuccess
  | DeleteMemberLoading
  | DeleteMemberError
  | DeleteMemberSuccess
  | ResetMember
  | SetAction;

export default TMembersAction;
