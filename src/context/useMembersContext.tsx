import React, { useCallback, useEffect, useReducer } from "react";
import TMembersAction from "../reducer/members/actions";
import membersReducer from "../reducer/members/reducer";
import { IMembersState, TMembersData } from "../reducer/members/types";
import { ENTITIES_ACTIONS, LOADING_STATUS, OPERATIONS_ACTIONS } from "../types";
import * as Database from "../database/database";

export interface IMembersContext {
  state: IMembersState;
  dispatch: React.Dispatch<TMembersAction>;
  setMember: (obj: TMembersData) => void;
  getMember: (id: string) => void;
  getMembers: () => void;
  deleteMember: (id: string) => void;
  resetMember: () => void;
  setAction: (type: ENTITIES_ACTIONS, id?: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialState: IMembersState = {
  member: {
    item: undefined,
    status: LOADING_STATUS.INIT,
    operation: OPERATIONS_ACTIONS.IDLE,
  },
  members: {
    items: [],
    status: LOADING_STATUS.INIT,
    operation: OPERATIONS_ACTIONS.IDLE,
  },
  action: { id: undefined, type: ENTITIES_ACTIONS.IDLE },
};

const contextInitialState: IMembersContext = {
  state: initialState,
  dispatch: noop,
  setMember: noop,
  getMember: noop,
  getMembers: noop,
  deleteMember: noop,
  resetMember: noop,
  setAction: noop,
};

export const MembersContext =
  React.createContext<IMembersContext>(contextInitialState);

export const MembersContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(membersReducer, initialState);

  const setMember = useCallback(async (obj: TMembersData) => {
    dispatch({
      type: "MEMBER_SET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const result = await db.member.upsert(obj);
      if (result) {
        dispatch({
          type: "MEMBER_SET_SUCCESS",
        });
      } else {
        dispatch({
          type: "MEMBER_SET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "MEMBER_SET_ERROR",
      });
    }
  }, []);

  const getMember = useCallback(async (id: string) => {
    dispatch({
      type: "MEMBER_GET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = await db.member
        .findOne({
          selector: {
            id: id,
          },
        })
        .exec();
      if (data) {
        data?.$.subscribe((Member: any) => {
          dispatch({
            type: "MEMBER_GET_SUCCESS",
            payload: Member,
          });
        });
      } else {
        dispatch({
          type: "MEMBER_GET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "MEMBER_GET_ERROR",
      });
    }
  }, []);

  const getMembers = useCallback(async () => {
    dispatch({
      type: "MEMBERS_GET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = db.member.find();
      if (data) {
        data?.$.subscribe((Members: Array<any>) => {
          dispatch({
            type: "MEMBERS_GET_SUCCESS",
            payload: Members,
          });
        });
      } else {
        dispatch({
          type: "MEMBERS_GET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "MEMBERS_GET_ERROR",
      });
    }
  }, []);

  const deleteMember = useCallback(async (id: string) => {
    dispatch({
      type: "MEMBER_DELETE_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = await db.member
        .findOne({
          selector: {
            id: id,
          },
        })
        .exec();

      if (data) {
        const removedDocs = await data.remove();
        removedDocs?.$.subscribe(() => {
          dispatch({
            type: "MEMBER_DELETE_SUCCESS",
          });
        });
      } else {
        dispatch({
          type: "MEMBER_DELETE_ERROR",
        });
      }
    } else {
      dispatch({
        type: "MEMBER_DELETE_ERROR",
      });
    }
  }, []);

  const setAction = useCallback((type: ENTITIES_ACTIONS, id?: string) => {
    dispatch({
      type: "SET_ACTION",
      payload: { id, type },
    });
  }, []);

  const resetMember = useCallback(() => {
    dispatch({
      type: "MEMBER_RESET",
    });
  }, []);

  return (
    <MembersContext.Provider
      value={{
        state,
        dispatch,
        setMember,
        getMember,
        getMembers,
        deleteMember,
        resetMember,
        setAction,
      }}
    >
      {props.children}
    </MembersContext.Provider>
  );
};

export const useMembersContext = (): IMembersContext => {
  const context = React.useContext(MembersContext);
  if (context === undefined) {
    throw new Error(
      "useMembersContext must be used within a MembersContext.Provider"
    );
  }
  return context;
};
