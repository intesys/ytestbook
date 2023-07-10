import React, { useCallback, useReducer } from "react";
import { IYTestbookState } from "../reducer/testbook/types";
import TYTestbookAction from "../reducer/testbook/actions";
import yTestbookReducer from "../reducer/testbook/reducer";
import { yTestbookApiConfig } from "../config/yTestbookApiConfig";
import { UserLoginRequest, YTestbookApi } from "../generated";
import type { AjaxError } from "rxjs/ajax";
import { LOADING_STATUS } from "../reducer/types";

export interface IYTestbookContext {
  state: IYTestbookState;
  dispatch: React.Dispatch<TYTestbookAction>;
  userLogin: (credentials: UserLoginRequest) => void;
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
};

export const YTestbookContext = React.createContext<IYTestbookContext>(contextInitialState);

export const YTestbookContextProvider: React.FC<IYTestbookContextProvider> = (props) => {
  const [state, dispatch] = useReducer(yTestbookReducer, initialState);
  const yTestbookApi = new YTestbookApi(yTestbookApiConfig());

  const userLogin = useCallback((credentials: UserLoginRequest) => {
    dispatch({
      type: "USER_LOGIN_LOADING",
    });

    yTestbookApi.userLogin(credentials).subscribe({
      next: (response) => {
        dispatch({
          type: "USER_LOGIN_SUCCESS",
        });
      },
      error: (err: AjaxError) => {
        dispatch({
          type: "USER_LOGIN_ERROR",
        });
      },
    });
  }, []);

  return (
    <YTestbookContext.Provider
      value={{
        state,
        dispatch,
        userLogin,
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
