import React, { useCallback, useEffect, useReducer } from "react";
import { IYTestbookState } from "../reducer/testbook/types";
import TYTestbookAction from "../reducer/testbook/actions";
import yTestbookReducer from "../reducer/testbook/reducer";
import { yTestbookApiConfig } from "../config/yTestbookApiConfig";
import {
  LoginRequest,
  YTestbookApi,
  TestbookRequest,
  TestbookResponse,
  TestcaseResponse,
} from "../generated";
import type { AjaxError } from "rxjs/ajax";
import { LOADING_STATUS } from "../reducer/types";
import { readToken, saveToken } from "../lib/auth";

export interface IYTestbookContext {
  state: IYTestbookState;
  dispatch: React.Dispatch<TYTestbookAction>;
  userLogin: (credentials: LoginRequest) => void;
  refreshAuth: (accessToken: string) => void;
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
  auth: { status: LOADING_STATUS.IDLE },
  testbooks: { status: LOADING_STATUS.IDLE, data: [] },
  testbook: { status: LOADING_STATUS.IDLE },
  testcases: { status: LOADING_STATUS.IDLE, data: [] },
  testcase: { status: LOADING_STATUS.IDLE },
};

const contextInitialState: IYTestbookContext = {
  state: initialState,
  dispatch: noop,
  userLogin: noop,
  refreshAuth: noop,
  getTestbooks: noop,
  postTestbook: noop,
  setTestbook: noop,
  getTestcases: noop,
  setTestcase: noop,
};

export const YTestbookContext = React.createContext<IYTestbookContext>(contextInitialState);

export const YTestbookContextProvider: React.FC<IYTestbookContextProvider> = (props) => {
  const [state, dispatch] = useReducer(yTestbookReducer, initialState);
  const yTestbookApi = new YTestbookApi(yTestbookApiConfig());

  useEffect(() => {
    if (state.auth.status === LOADING_STATUS.SUCCESS && state.auth.data) {
      saveToken(state.auth.data);
    } else {
      const accessToken = readToken();
      if (!state.auth.data && accessToken) {
        refreshAuth(accessToken);
      }
    }
  }, [state.auth]);

  const userLogin = useCallback((credentials: LoginRequest) => {
    dispatch({
      type: "USER_LOGIN_LOADING",
    });

    yTestbookApi.userLogin({ loginRequest: credentials }).subscribe({
      next: (response) => {
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: response,
        });
      },
      error: (err: AjaxError) => {
        dispatch({
          type: "USER_LOGIN_ERROR",
        });
      },
    });
  }, []);

  const refreshAuth = useCallback((accessToken: string) => {
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: { accessToken },
    });
  }, []);

  const getTestbooks = useCallback(() => {
    dispatch({
      type: "GET_TESTBOOKS_LOADING",
    });

    yTestbookApi.testbookAllGet().subscribe({
      next: (response) => {
        dispatch({
          type: "GET_TESTBOOKS_SUCCESS",
          payload: response,
        });
      },
      error: (err: AjaxError) => {
        dispatch({
          type: "GET_TESTBOOKS_ERROR",
        });
      },
    });
  }, []);

  const postTestbook = useCallback((testbookRequest: TestbookRequest) => {
    dispatch({
      type: "POST_TESTBOOK_LOADING",
    });

    yTestbookApi.testbookPost({ testbookRequest }).subscribe({
      next: (response) => {
        dispatch({
          type: "POST_TESTBOOK_SUCCESS",
          payload: response,
        });
      },
      error: (err: AjaxError) => {
        dispatch({
          type: "POST_TESTBOOK_ERROR",
        });
      },
    });
  }, []);

  const setTestbook = useCallback((testbookRequest: TestbookRequest) => {
    dispatch({
      type: "POST_TESTBOOK_SUCCESS",
      payload: testbookRequest,
    });
  }, []);

  const getTestcases = useCallback(() => {
    dispatch({
      type: "GET_TESTCASES_LOADING",
    });

    yTestbookApi.testcaseAllGet().subscribe({
      next: (response) => {
        dispatch({
          type: "GET_TESTCASES_SUCCESS",
          payload: response,
        });
      },
      error: (err: AjaxError) => {
        dispatch({
          type: "GET_TESTCASES_ERROR",
        });
      },
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
        userLogin,
        refreshAuth,
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
    throw new Error("useYTestbookContext must be used within a useYTestbookContext.Provider");
  }
  return context;
};
