import React, { useCallback, useReducer } from "react";
import {
  ITestbookModel,
  ITestbookRequest,
  ITestcaseModel,
} from "../api/models";
import { yTestbookApiConfig } from "../config/yTestbookApiConfig";
import {
  TestbookRequest,
  TestbookResponse,
  TestcaseResponse,
  YTestbookApi,
} from "../generated";
import TYTestbookAction from "../reducer/testbook/actions";
import yTestbookReducer from "../reducer/testbook/reducer";
import { IYTestbookState } from "../reducer/testbook/types";
import { LOADING_STATUS } from "../reducer/types";

export interface IYTestbookContext {
  state: IYTestbookState;
  dispatch: React.Dispatch<TYTestbookAction>;
  getTestbooks: () => void;
  postTestbook: (testbookRequest: TestbookRequest) => void;
  setTestbook: (testbook: TestbookResponse) => void;
  getTestcases: () => void;
  setTestcase: (testcaseRequest: TestcaseResponse) => void;
}

export interface IYTestbookContextProvider {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialState: IYTestbookState = {
  testbooks: { status: LOADING_STATUS.IDLE, data: [] },
  testbook: { status: LOADING_STATUS.IDLE },
  testcases: { status: LOADING_STATUS.IDLE, data: [] },
  testcase: { status: LOADING_STATUS.IDLE },
};

const contextInitialState: IYTestbookContext = {
  state: initialState,
  dispatch: noop,
  getTestbooks: noop,
  postTestbook: noop,
  setTestbook: noop,
  getTestcases: noop,
  setTestcase: noop,
};

export const YTestbookContext =
  React.createContext<IYTestbookContext>(contextInitialState);

export const YTestbookContextProvider: React.FC<IYTestbookContextProvider> = (
  props
) => {
  const [state, dispatch] = useReducer(yTestbookReducer, initialState);
  const yTestbookApi = new YTestbookApi(yTestbookApiConfig());

  const getTestbooks = useCallback(() => {
    dispatch({
      type: "GET_TESTBOOKS_LOADING",
    });

    yTestbookApi
      .getTestbook()
      .then((response) => {
        dispatch({
          type: "GET_TESTBOOKS_SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_TESTBOOKS_ERROR",
        });
      });
  }, []);

  const postTestbook = useCallback((testbook: ITestbookRequest) => {
    dispatch({
      type: "POST_TESTBOOK_LOADING",
    });

    yTestbookApi
      .postTestbook(testbook)
      .then(function (response) {
        dispatch({
          type: "POST_TESTBOOK_SUCCESS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "POST_TESTBOOK_ERROR",
        });
      });
  }, []);

  const setTestbook = useCallback((testbook: ITestbookModel) => {
    dispatch({
      type: "POST_TESTBOOK_SUCCESS",
      payload: testbook,
    });
  }, []);

  const getTestcases = useCallback(() => {
    dispatch({
      type: "GET_TESTCASES_LOADING",
    });

    yTestbookApi
      .getTestcase()
      .then(function (response) {
        dispatch({
          type: "GET_TESTCASES_SUCCESS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "GET_TESTCASES_ERROR",
        });
      });
  }, []);

  const setTestcase = useCallback((testcase: ITestcaseModel) => {
    dispatch({
      type: "POST_TESTCASE_SUCCESS",
      payload: testcase,
    });
  }, []);

  const setTestcase = useCallback((testcase: TestcaseResponse) => {
    dispatch({
      type: "POST_TESTCASE_SUCCESS",
      payload: testcase,
    });
  }, []);

  return (
    <YTestbookContext.Provider
      value={{
        state,
        dispatch,
        getTestbooks,
        postTestbook,
        setTestbook,
        getTestcases,
        setTestcase,
      }}
    >
      {props.children}
    </YTestbookContext.Provider>
  );
};

export const useYTestbookContext = (): IYTestbookContext => {
  const context = React.useContext(YTestbookContext);
  if (context === undefined) {
    throw new Error(
      "useYTestbookContext must be used within a useYTestbookContext.Provider"
    );
  }
  return context;
};
