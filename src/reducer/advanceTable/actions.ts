
import { MRT_ColumnFiltersState } from "mantine-react-table";

interface InitTable {
    type: "INIT_TABLE";
    tableId: string;
}

interface SetTableFilter {
    type: "SET_TABLE_FILTER";
    payload: MRT_ColumnFiltersState;
    tableId: string;
}

type IAdvanceTableAction =
  | InitTable
  | SetTableFilter

export default IAdvanceTableAction;
