import { MRT_TableOptions } from "mantine-react-table";

export interface IProps<T extends object> extends React.PropsWithChildren {
  tableId: string;
  tableFilters?: React.ReactNode;
  options?: MRT_TableOptions<T>;
}
