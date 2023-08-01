import { produce } from "immer";
import AdvanceTableAction from "./actions";
import { IAdvanceTableState } from "./types";

const advanceTableReducer = produce(
  (state: IAdvanceTableState, action: AdvanceTableAction): IAdvanceTableState => {
    switch (action.type) {
      case "INIT_TABLE":
        state.tables[action.tableId] = {
          filters: [],
        };
        break;
        case "SET_TABLE_FILTER":
          const currentFilters = state.tables[action.tableId].filters;
          const currentFilterIndex = currentFilters.findIndex(
            (filter) => filter.id === action.payload[0].id
          ); 
          
          if(currentFilterIndex === -1) {
            state.tables[action.tableId].filters = [...state.tables[action.tableId].filters, ...action.payload];
          }else{
            const isEmpty = action.payload[0].value === "" || (action.payload[0].value as string[]).length === 0;
            
            if(isEmpty) {
              const removedFilter = currentFilters.filter((filter) => filter.id !== action.payload[0].id);
              state.tables[action.tableId].filters = removedFilter;
            }else{
              state.tables[action.tableId].filters[currentFilterIndex].value = action.payload[0].value;
            }
          }
          break;
        default:
          return state;
    }
    return state;
  }
);

export default advanceTableReducer;
