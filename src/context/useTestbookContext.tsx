import React, { useCallback, useContext, useEffect, useReducer } from "react";
import TTestbookAction from "../reducer/testbook/actions";
import testbookReducer from "../reducer/testbook/reducer";
import * as Database from "../database/database";
import {
  ITestbookState,
  TTestbookData,
  LOADING_STATUS,
  OperationEnum,
} from "../reducer/testbook/types";

export interface ITestbookContext {
  state: ITestbookState;
  dispatch: React.Dispatch<TTestbookAction>;
  setTestbook: (obj: TTestbookData) => void;
  getTestbook: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialState: ITestbookState = {
  testbook: {
    item: undefined,
    status: LOADING_STATUS.INIT,
    operation: OperationEnum.IDLE,
  },
};

const contextInitialState: ITestbookContext = {
  state: initialState,
  dispatch: noop,
  setTestbook: noop,
  getTestbook: noop,
};

export const TestbookContext =
  React.createContext<ITestbookContext>(contextInitialState);

export const TestbookContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(testbookReducer, initialState);

  useEffect(() => {
    if (
      state.testbook.status === LOADING_STATUS.SUCCESS &&
      state.testbook.operation === OperationEnum.SET
    )
      getTestbook();
  }, [state.testbook.status, state.testbook.operation]);

  const setTestbook = useCallback(async (obj: TTestbookData) => {
    dispatch({
      type: "TESTBOOK_SET_LOADING",
    });

    const db = await Database.getInstance();
    if (db) {
      const result = await db.testbooks.upsert(obj);
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
      const data = await db.testbooks.findOne().exec();
      data.$.subscribe((testbook: any) => {
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
  }, []);

  return (
    <TestbookContext.Provider
      value={{
        state,
        dispatch,
        setTestbook,
        getTestbook,
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
