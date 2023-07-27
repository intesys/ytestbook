import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";
import { TestcaseResponse } from "../../../generated";
import TableAdvance from "../../ui/TableAdvance/TableAdvance";
import OverviewFilters from "./OverviewFilters";
import { OverviewProps } from "./types";

const Overview: React.FC<OverviewProps> = ({ data = [] }) => {
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "title", //simple recommended way to define a column
          header: "Title",
          // enableColumnActions: false,
          // filterFns: (value, row) => row.title.toLowerCase().includes(value),
        },
      ] as MRT_ColumnDef<TestcaseResponse>[],
    []
  );

  return (
    <TableAdvance<TestcaseResponse>
      data={data}
      columns={columns}
      tableFilters={<OverviewFilters />}
    />
  );
};

export default Overview;
