import React, { useCallback, useEffect, useReducer } from "react";
import TTagsAction from "../reducer/tags/actions";
import TagsReducer from "../reducer/tags/reducer";
import { ITagsState, TTagsData } from "../reducer/tags/types";
import { ENTITIES_ACTIONS, LOADING_STATUS, OPERATIONS_ACTIONS } from "../types";
import * as Database from "../database/database";

export interface ITagsContext {
  state: ITagsState;
  dispatch: React.Dispatch<TTagsAction>;
  setTag: (obj: TTagsData) => void;
  getTag: (id: string) => void;
  getTags: () => void;
  deleteTag: (id: string) => void;
  resetTag: () => void;
  setAction: (type: ENTITIES_ACTIONS, id?: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialState: ITagsState = {
  tag: {
    item: undefined,
    status: LOADING_STATUS.INIT,
    operation: OPERATIONS_ACTIONS.IDLE,
  },
  tags: {
    items: [],
    status: LOADING_STATUS.INIT,
    operation: OPERATIONS_ACTIONS.IDLE,
  },
  action: { id: undefined, type: ENTITIES_ACTIONS.IDLE },
};

const contextInitialState: ITagsContext = {
  state: initialState,
  dispatch: noop,
  setTag: noop,
  getTag: noop,
  getTags: noop,
  deleteTag: noop,
  resetTag: noop,
  setAction: noop,
};

export const TagsContext =
  React.createContext<ITagsContext>(contextInitialState);

export const TagsContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(TagsReducer, initialState);

  const setTag = useCallback(async (obj: TTagsData) => {
    dispatch({
      type: "TAG_SET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const result = await db.tag.upsert(obj);
      if (result) {
        dispatch({
          type: "TAG_SET_SUCCESS",
        });
      } else {
        dispatch({
          type: "TAG_SET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "TAG_SET_ERROR",
      });
    }
  }, []);

  const getTag = useCallback(async (id: string) => {
    dispatch({
      type: "TAG_GET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = await db.tag
        .findOne({
          selector: {
            id: id,
          },
        })
        .exec();
      if (data) {
        data?.$.subscribe((Tag: any) => {
          dispatch({
            type: "TAG_GET_SUCCESS",
            payload: Tag,
          });
        });
      } else {
        dispatch({
          type: "TAG_GET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "TAG_GET_ERROR",
      });
    }
  }, []);

  const getTags = useCallback(async () => {
    dispatch({
      type: "TAGS_GET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = db.tag.find();
      if (data) {
        data?.$.subscribe((Tags: Array<any>) => {
          dispatch({
            type: "TAGS_GET_SUCCESS",
            payload: Tags,
          });
        });
      } else {
        dispatch({
          type: "TAGS_GET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "TAGS_GET_ERROR",
      });
    }
  }, []);

  const deleteTag = useCallback(async (id: string) => {
    dispatch({
      type: "TAG_DELETE_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = await db.tag
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
            type: "TAG_DELETE_SUCCESS",
          });
        });
      } else {
        dispatch({
          type: "TAG_DELETE_ERROR",
        });
      }
    } else {
      dispatch({
        type: "TAG_DELETE_ERROR",
      });
    }
  }, []);

  const setAction = useCallback((type: ENTITIES_ACTIONS, id?: string) => {
    dispatch({
      type: "SET_ACTION",
      payload: { id, type },
    });
  }, []);

  const resetTag = useCallback(() => {
    dispatch({
      type: "TAG_RESET",
    });
  }, []);

  return (
    <TagsContext.Provider
      value={{
        state,
        dispatch,
        setTag,
        getTag,
        getTags,
        deleteTag,
        resetTag,
        setAction,
      }}
    >
      {props.children}
    </TagsContext.Provider>
  );
};

export const useTagsContext = (): ITagsContext => {
  const context = React.useContext(TagsContext);
  if (context === undefined) {
    throw new Error(
      "useTagsContext must be used within a TagsContext.Provider"
    );
  }
  return context;
};
