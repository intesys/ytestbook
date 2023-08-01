
import { MRT_ColumnFiltersState } from "mantine-react-table";

interface ISingleAdvanceTable {
  [key: string]: {
    filters: MRT_ColumnFiltersState;
  };
}

export interface IAdvanceTableState {
  tables: ISingleAdvanceTable
}
