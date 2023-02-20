import React, { useCallback, useEffect, useReducer } from "react";
import TTestbookAction from "../reducer/testbook/actions";
import testbookReducer from "../reducer/testbook/reducer";
import * as Database from "../database/database";
import { ITestbookState, TTestbookData } from "../reducer/testbook/types";
import { LOADING_STATUS, OPERATIONS_ACTIONS } from "../types";

export interface ITestbookContext {
  state: ITestbookState;
  dispatch: React.Dispatch<TTestbookAction>;
  setTestbook: (obj: TTestbookData) => void;
  getTestbook: () => void;
  testbookReload: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialState: ITestbookState = {
  testbook: {
    item: undefined,
    status: LOADING_STATUS.INIT,
    operation: OPERATIONS_ACTIONS.IDLE,
  },
};

const contextInitialState: ITestbookContext = {
  state: initialState,
  dispatch: noop,
  setTestbook: noop,
  getTestbook: noop,
  testbookReload: noop,
};

export const TestbookContext =
  React.createContext<ITestbookContext>(contextInitialState);

export const TestbookContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(testbookReducer, initialState);

  useEffect(() => {
    getTestbook();
  }, []);

  useEffect(() => {
    if (
      state.testbook.status === LOADING_STATUS.SUCCESS &&
      state.testbook.operation === OPERATIONS_ACTIONS.SET
    )
      getTestbook();
  }, [state.testbook.status, state.testbook.operation]);

  useEffect(() => {
    if (state.testbook.status === LOADING_STATUS.RELOAD) getTestbook();
  }, [state.testbook.status]);

  const setTestbook = useCallback(async (obj: TTestbookData) => {
    dispatch({
      type: "TESTBOOK_SET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const result = await db.testbook.upsert(obj);
      if (result) {
        dispatch({
          type: "TESTBOOK_SET_SUCCESS",
        });
      } else {
        dispatch({
          type: "TESTBOOK_SET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "TESTBOOK_SET_ERROR",
      });
    }
  }, []);

  const getTestbook = useCallback(async () => {
    dispatch({
      type: "TESTBOOK_GET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const data = await db.testbook.findOne().exec();
      if (data) {
        data?.$.subscribe((testbook: any) => {
          dispatch({
            type: "TESTBOOK_GET_SUCCESS",
            payload: testbook,
          });
        });
      } else {
        dispatch({
          type: "TESTBOOK_GET_ERROR",
        });
      }
    } else {
      dispatch({
        type: "TESTBOOK_GET_ERROR",
      });
    }
  }, []);

  const testbookReload = useCallback(async () => {
    dispatch({
      type: "TESTBOOK_RELOAD",
    });
  }, []);

  return (
    <TestbookContext.Provider
      value={{
        state,
        dispatch,
        setTestbook,
        getTestbook,
        testbookReload,
      }}
    >
      {props.children}
    </TestbookContext.Provider>
  );
};

export const useTestbookContext = (): ITestbookContext => {
  const context = React.useContext(TestbookContext);
  if (context === undefined) {
    throw new Error(
      "useTestbookContext must be used within a TestbookContext.Provider"
    );
  }
  return context;
};