import { Avatar, Badge, Group, Tooltip } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";
import { ITestcaseModel } from "../../../api/models";
import {
  getFormattedDateDayJs,
  sortingByDateDayJs,
} from "../../../lib/date/date";
import { statusIcon } from "../../../lib/misc";
import { getIntialLettersFromName } from "../../../lib/string/string";
import TableAdvance from "../../ui/TableAdvance/TableAdvance";
import OverviewFilters from "./OverviewFilters";
import { OverviewProps } from "./types";

const TABLE_NAME_OVERVIEW = "overview";

const Overview: React.FC<OverviewProps> = ({ data = [] }) => {
  const columns = useMemo(
    () =>
      [
        {
          accessorKey: "status",
        },
        {
          accessorKey: "title",
          header: "Title",
          enableColumnActions: false,
          Cell: ({ cell, row }) => {
            return (
              <Group spacing="xs">
                <>
                  {statusIcon({
                    status: row.original.status,
                    size: 20,
                  })}{" "}
                  {cell.getValue()}
                </>
              </Group>
            );
          },
        },
        {
          accessorKey: "tag",
          header: "Tags",
          enableColumnActions: false,
          enableSorting: false,
          filterVariant: "multi-select",
          Cell: ({ cell }) => {
            const tags = cell.getValue<Array<string>>();
            const numberOfTags = tags.length;
            return (
              <Tooltip.Group openDelay={300} closeDelay={100}>
                <Group position="left" spacing={3}>
                  {tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                  {numberOfTags >= 4 && (
                    <Tooltip
                      withArrow
                      label={
                        <>
                          {tags.slice(3).map((tag, index) => (
                            <div key={index}>{tag}</div>
                          ))}
                        </>
                      }
                    >
                      <Badge color="dark.9">
                        <strong>+{numberOfTags - 3}</strong> more
                      </Badge>
                    </Tooltip>
                  )}
                </Group>
              </Tooltip.Group>
            );
          },
        },
        {
          accessorKey: "lastEditDate",
          header: "Last edit",
          enableColumnActions: false,
          sortingFn: sortingByDateDayJs("lastEditDate"),
          Cell: ({ cell }) => getFormattedDateDayJs(cell.getValue<number>()),
        },
        {
          accessorKey: "user",
          header: "Assignee",
          enableColumnActions: false,
          enableSorting: false,
          Cell: ({ cell }) => {
            const users = cell.getValue<Array<string>>();
            const numberOfTags = users.length;
            return (
              <Tooltip.Group openDelay={300} closeDelay={100}>
                <Avatar.Group spacing={3}>
                  {users.slice(0, 3).map((user, index) => (
                    <Tooltip label={user} withArrow key={index}>
                      <Avatar
                        src={null}
                        size="sm"
                        alt={user}
                        radius="xl"
                        color="indigo"
                      >
                        {getIntialLettersFromName(user)}
                      </Avatar>
                    </Tooltip>
                  ))}
                  {numberOfTags >= 4 && (
                    <Tooltip
                      withArrow
                      label={
                        <>
                          {users.slice(3).map((user, index) => (
                            <div key={index}>{user}</div>
                          ))}
                        </>
                      }
                    >
                      <Avatar size="sm" radius="xl" color="dark">
                        + {numberOfTags - 3}
                      </Avatar>
                    </Tooltip>
                  )}
                </Avatar.Group>
              </Tooltip.Group>
            );
          },
        },
      ] as MRT_ColumnDef<ITestcaseModel>[],
    []
  );

  return (
    <TableAdvance<ITestcaseModel>
      tableId={TABLE_NAME_OVERVIEW}
      tableFilters={
        <OverviewFilters tableId={TABLE_NAME_OVERVIEW} data={data} />
      }
      options={{
        data: data,
        columns: columns,
        initialState: {
          sorting: [
            {
              id: "lastEditDate",
              desc: true,
            },
          ],
          columnVisibility: {
            status: false,
          },
        },
      }}
    />
  );
};

export default Overview;
