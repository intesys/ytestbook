import { Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { StatusEnum } from "../../../api/models/enum";
import { useAdvanceTableContext } from "../../../context/useAdvanceTableContext";
import { getSelectOptionsFromData } from "../../../lib/filters/filters";
import { statusIcon } from "../../../lib/misc";
import MultipleSelectField from "../../ui/MultipleSelectField/MultipleSelectField";
import SegmentedField from "../../ui/SegmentedField/SegmentedField";
import TextField from "../../ui/TextField/TextField";
import { OverviewFiltersProps } from "./types";

const OverviewFilters: React.FC<OverviewFiltersProps> = ({ data = [] }) => {
  const { setFilters } = useAdvanceTableContext();

  const tags = getSelectOptionsFromData(data, "tag");
  const users = getSelectOptionsFromData(data, "user");

  return (
    <>
      <Group>
        <TextField
          placeholder="Search"
          rightSection={<IconSearch />}
          onChange={(value) => setFilters([{ id: "title", value: value }])}
        />
        <SegmentedField
          name="status"
          onChange={(value) => setFilters([{ id: "status", value: value }])}
          data={[
            {
              label: statusIcon({
                status: "All",
                size: 20,
              }),
              value: "",
            },
            {
              label: statusIcon({
                status: StatusEnum.Blocked,
                size: 20,
              }),
              value: StatusEnum.Blocked,
            },
            {
              label: statusIcon({
                status: StatusEnum.Cancelled,
                size: 20,
              }),
              value: StatusEnum.Cancelled,
            },
            {
              label: statusIcon({ status: StatusEnum.Done, size: 20 }),
              value: StatusEnum.Done,
            },
            {
              label: statusIcon({ status: StatusEnum.Fail, size: 20 }),
              value: StatusEnum.Fail,
            },
            {
              label: statusIcon({ status: StatusEnum.Paused, size: 20 }),
              value: StatusEnum.Paused,
            },
            {
              label: statusIcon({ status: StatusEnum.Pending, size: 20 }),
              value: StatusEnum.Pending,
            },
            {
              label: statusIcon({ status: StatusEnum.Todo, size: 20 }),
              value: StatusEnum.Todo,
            },
          ]}
        />
        <MultipleSelectField
          placeholder="Filter by tag"
          data={tags}
          onChange={(value) => setFilters([{ id: "tag", value: value }])}
        />
        <MultipleSelectField
          placeholder="Filter assegnee"
          data={users}
          onChange={(value) => setFilters([{ id: "user", value: value }])}
        />
      </Group>
    </>
  );
};

export default OverviewFilters;
