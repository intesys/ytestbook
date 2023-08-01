import { MRT_ColumnFiltersState } from "mantine-react-table";
import React, { useCallback, useEffect, useReducer } from "react";
import IAdvanceTableAction from "../reducer/advanceTable/actions";
import advanceTableReducer from "../reducer/advanceTable/reducer";
import { IAdvanceTableState } from "../reducer/advanceTable/types";

export interface IAdvanceTableContext {
  state: IAdvanceTableState;
  dispatch: React.Dispatch<IAdvanceTableAction>;
  initTable: (tableId: string) => void;
  setFilters: (filters: MRT_ColumnFiltersState) => void;
}

export interface IAdvanceTableContextProvider {
  tableId: string;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialState: IAdvanceTableState = {
  tables: {}
};

const contextInitialState: IAdvanceTableContext = {
  state: initialState,
  dispatch: noop,
  setFilters: noop,
  initTable: noop,
};

export const YAdvanceTableContext =
  React.createContext<IAdvanceTableContext>(contextInitialState);

export const YAdvanceTableContextProvider: React.FC<IAdvanceTableContextProvider> = (
  props
) => {
  const [state, dispatch] = useReducer(advanceTableReducer, initialState);


  useEffect(() => {
    initTable(props.tableId)
  }, [props.tableId])


  const setFilters = useCallback((filters: MRT_ColumnFiltersState) => {
    dispatch({
      type: "SET_TABLE_FILTER",
      payload: filters,
      tableId: props.tableId,
    });
  }, []);

  const initTable = useCallback((tableId: string) => {
    dispatch({
      type: "INIT_TABLE",
      tableId: tableId,
    });
  }, []);

  
  return (
    <YAdvanceTableContext.Provider
      value={{
        state,
        dispatch,
        initTable,
        setFilters,
      }}
    >
      {props.children}
    </YAdvanceTableContext.Provider>
  );
};

export const useAdvanceTableContext = (): IAdvanceTableContext => {
  const context = React.useContext(YAdvanceTableContext);
  if (context === undefined) {
    throw new Error(
      "useAdvanceTableContext must be used within a useAdvanceTableContext.Provider"
    );
  }
  return context;
};
