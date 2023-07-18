import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { IProps } from "./types";

function TableAdvance<T extends object>({
  columns,
  data,
  tableFilters,
  tableOptions,
}: IProps<T>) {
  const table = useMantineReactTable({
    columns,
    data,
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

    ...tableOptions,
  });

  return <MantineReactTable table={table} />;
}

export default TableAdvance;
