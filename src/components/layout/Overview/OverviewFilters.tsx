import { Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { useAdvanceTableContext } from "../../../context/useAdvanceTableContext";
import { getSelectOptionsFromData } from "../../../lib/filters/filters";
import { StatusIcon } from "../../misc/StatusIcon";
import MultipleSelectField from "../../ui/MultipleSelectField/MultipleSelectField";
import SegmentedField from "../../ui/SegmentedField/SegmentedField";
import TextField from "../../ui/TextField/TextField";
import { OverviewFiltersProps } from "./types";
import { STATUS } from "../../../types/status";

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
              label: StatusIcon({
                status: "All",
                size: 20,
              }),
              value: "",
            },
            {
              label: StatusIcon({
                status: STATUS.BLOCKED,
                size: 20,
              }),
              value: STATUS.BLOCKED,
            },
            {
              label: StatusIcon({
                status: STATUS.CANCELLED,
                size: 20,
              }),
              value: STATUS.CANCELLED,
            },
            {
              label: StatusIcon({ status: STATUS.DONE, size: 20 }),
              value: STATUS.DONE,
            },
            {
              label: StatusIcon({ status: STATUS.FAIL, size: 20 }),
              value: STATUS.FAIL,
            },
            {
              label: StatusIcon({ status: STATUS.PAUSED, size: 20 }),
              value: STATUS.PAUSED,
            },
            {
              label: StatusIcon({ status: STATUS.PENDING, size: 20 }),
              value: STATUS.PENDING,
            },
            {
              label: StatusIcon({ status: STATUS.TODO, size: 20 }),
              value: STATUS.TODO,
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
