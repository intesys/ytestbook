import { MRT_ColumnDef, MRT_TableOptions } from "mantine-react-table";

export interface IProps<T extends object> extends React.PropsWithChildren {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  tableFilters?: React.ReactNode;
  tableOptions?: MRT_TableOptions<T>;
}
