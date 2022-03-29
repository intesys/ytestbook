import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { ENTITIES_ACTIONS } from "../types";

export interface IUseCasesContext {
  id?: number;
  action: ENTITIES_ACTIONS;
}

type TUseCasesContext = {
  useCases: IUseCasesContext;
  setUseCases: Dispatch<SetStateAction<IUseCasesContext>>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialUseCasesContext: IUseCasesContext = {
  id: 0,
  action: ENTITIES_ACTIONS.IDLE,
};

const contextInitialState: TUseCasesContext = {
  useCases: initialUseCasesContext,
  setUseCases: noop,
};

export const UseCasesContext =
  React.createContext<TUseCasesContext>(contextInitialState);

export const UseCasesContextProvider: React.FC = (props) => {
  const [useCases, setUseCases] = useState(initialUseCasesContext);

  return (
    <UseCasesContext.Provider
      value={{
        useCases,
        setUseCases,
      }}
    >
      {props.children}
    </UseCasesContext.Provider>
  );
};

export const useUseCasesContext = (): TUseCasesContext => {
  const context = React.useContext(UseCasesContext);
  if (context === undefined) {
    throw new Error(
      "useUseCasesContext must be used within a UseCasesContext.Provider"
    );
  }
  return context;
};
