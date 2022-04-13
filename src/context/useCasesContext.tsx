import React, { useCallback, useEffect, useReducer } from "react";
import TUseCasesAction from "../reducer/usecases/actions";
import usecasesReducer from "../reducer/usecases/reducer";
import { IUseCasesState, TUseCasesData } from "../reducer/usecases/types";
import { ENTITIES_ACTIONS, LOADING_STATUS, OPERATIONS_ACTIONS } from "../types";
import * as Database from "../database/database";

export interface IUseCasesContext {
  state: IUseCasesState;
  dispatch: React.Dispatch<TUseCasesAction>;
  setUseCase: (obj: TUseCasesData) => void;
  getUseCase: (id: string) => void;
  getUseCases: () => void;
  deleteUseCase: (id: string) => void;
  resetUseCase: () => void;
  setAction: (type: ENTITIES_ACTIONS, id?: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialState: IUseCasesState = {
  usecase: {
    item: undefined,
    status: LOADING_STATUS.INIT,
    operation: OPERATIONS_ACTIONS.IDLE,
  },
  usecases: {
    items: [],
    status: LOADING_STATUS.INIT,
    operation: OPERATIONS_ACTIONS.IDLE,
  },
  action: { id: undefined, type: ENTITIES_ACTIONS.IDLE },
};

const contextInitialState: IUseCasesContext = {
  state: initialState,
  dispatch: noop,
  setUseCase: noop,
  getUseCase: noop,
  getUseCases: noop,
  deleteUseCase: noop,
  resetUseCase: noop,
  setAction: noop,
};

export const UseCasesContext =
  React.createContext<IUseCasesContext>(contextInitialState);

export const UseCasesContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(usecasesReducer, initialState);

  const setUseCase = useCallback(async (obj: TUseCasesData) => {
    dispatch({
      type: "USECASE_SET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const result = await db.usecase.upsert(obj);
      if (result) {
        dispatch({
          type: "USECASE_SET_SUCCESS",
        });
      } else {
        dispatch({
          type: "USECASE_SET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "USECASE_SET_ERROR",
      });
    }
  }, []);

  const getUseCase = useCallback(async (id: string) => {
    dispatch({
      type: "USECASE_GET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = await db.usecase
        .findOne({
          selector: {
            id: id,
          },
        })
        .exec();
      if (data) {
        data?.$.subscribe((usecase: any) => {
          dispatch({
            type: "USECASE_GET_SUCCESS",
            payload: usecase,
          });
        });
      } else {
        dispatch({
          type: "USECASE_GET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "USECASE_GET_ERROR",
      });
    }
  }, []);

  const getUseCases = useCallback(async () => {
    dispatch({
      type: "USECASES_GET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = db.usecase.find();
      if (data) {
        data?.$.subscribe((usecases: Array<any>) => {
          dispatch({
            type: "USECASES_GET_SUCCESS",
            payload: usecases,
          });
        });
      } else {
        dispatch({
          type: "USECASES_GET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "USECASES_GET_ERROR",
      });
    }
  }, []);

  const deleteUseCase = useCallback(async (id: string) => {
    dispatch({
      type: "USECASE_DELETE_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = await db.usecase
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
            type: "USECASE_DELETE_SUCCESS",
          });
        });
      } else {
        dispatch({
          type: "USECASE_DELETE_ERROR",
        });
      }
    } else {
      dispatch({
        type: "USECASE_DELETE_ERROR",
      });
    }
  }, []);

  const setAction = useCallback((type: ENTITIES_ACTIONS, id?: string) => {
    dispatch({
      type: "SET_ACTION",
      payload: { id, type },
    });
  }, []);

  const resetUseCase = useCallback(() => {
    dispatch({
      type: "USECASE_RESET",
    });
  }, []);

  return (
    <UseCasesContext.Provider
      value={{
        state,
        dispatch,
        setUseCase,
        getUseCase,
        getUseCases,
        deleteUseCase,
        resetUseCase,
        setAction,
      }}
    >
      {props.children}
    </UseCasesContext.Provider>
  );
};

export const useUseCasesContext = (): IUseCasesContext => {
  const context = React.useContext(UseCasesContext);
  if (context === undefined) {
    throw new Error(
      "useUseCasesContext must be used within a UseCasesContext.Provider"
    );
  }
  return context;
};
