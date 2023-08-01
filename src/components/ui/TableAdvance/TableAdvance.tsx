import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { createContext } from "react";
import { YAdvanceTableContextProvider, useAdvanceTableContext } from "../../../context/useAdvanceTableContext";
import { IProps } from "./types";

export const TableAdvanceContext = createContext({});

function Table<T extends object>({
  tableId,
  tableFilters,
  options,
}: IProps<T>) {

  
  const {state} = useAdvanceTableContext();

  const table = useMantineReactTable({
    data: options?.data || [],
    columns: options?.columns || [],
    enableFilterMatchHighlighting: false,
    enableFilters: false,
    renderTopToolbar: tableFilters,
    enableTopToolbar: true,
    enableBottomToolbar: false,
    enablePagination: false,
    mantinePaperProps: {
      shadow: "",
      radius: 0,
      withBorder: false,
      sx: {
        backgroundColor: "transparent",
      },
    },
    mantineTableHeadRowProps: {
      sx: {
        backgroundColor: "transparent",
      },
    },
    state: {
      density: "xs",
      columnFilters: state.tables[tableId]?.filters || [],
    },
    ...options,
  });

  return <MantineReactTable table={table} />;
}

function TableAdvance<T extends object>({ tableId, tableFilters, options }: IProps<T>) {
  return (
  <YAdvanceTableContextProvider tableId={tableId}>
    <Table<T> tableId={tableId} tableFilters={tableFilters} options={options} />
  </YAdvanceTableContextProvider>
  )
}

export default TableAdvance;





