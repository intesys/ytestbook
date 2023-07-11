import React, { useCallback, useEffect, useReducer } from "react";
import { IYTestbookState } from "../reducer/testbook/types";
import TYTestbookAction from "../reducer/testbook/actions";
import yTestbookReducer from "../reducer/testbook/reducer";
import { yTestbookApiConfig } from "../config/yTestbookApiConfig";
import { LoginRequest, YTestbookApi } from "../generated";
import type { AjaxError } from "rxjs/ajax";
import { LOADING_STATUS } from "../reducer/types";
import { readToken, saveToken } from "../lib/auth";

export interface IYTestbookContext {
  state: IYTestbookState;
  dispatch: React.Dispatch<TYTestbookAction>;
  userLogin: (credentials: LoginRequest) => void;
  refreshAuth: (accessToken: string) => void;
}

export interface IYTestbookContextProvider {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialState: IYTestbookState = {
  auth: { status: LOADING_STATUS.IDLE },
};

const contextInitialState: IYTestbookContext = {
  state: initialState,
  dispatch: noop,
  userLogin: noop,
  refreshAuth: noop,
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

  return (
    <YTestbookContext.Provider
      value={{
        state,
        dispatch,
        userLogin,
        refreshAuth,
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
