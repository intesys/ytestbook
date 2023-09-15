import { Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { useAdvanceTableContext } from "../../../context/useAdvanceTableContext";
import { getSelectOptionsFromData } from "../../../lib/filters/filters";
import { statusIcon } from "../../../lib/misc";
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
              label: statusIcon({
                status: "All",
                size: 20,
              }),
              value: "",
            },
            {
              label: statusIcon({
                status: STATUS.BLOCKED,
                size: 20,
              }),
              value: STATUS.BLOCKED,
            },
            {
              label: statusIcon({
                status: STATUS.CANCELLED,
                size: 20,
              }),
              value: STATUS.CANCELLED,
            },
            {
              label: statusIcon({ status: STATUS.DONE, size: 20 }),
              value: STATUS.DONE,
            },
            {
              label: statusIcon({ status: STATUS.FAIL, size: 20 }),
              value: STATUS.FAIL,
            },
            {
              label: statusIcon({ status: STATUS.PAUSED, size: 20 }),
              value: STATUS.PAUSED,
            },
            {
              label: statusIcon({ status: STATUS.PENDING, size: 20 }),
              value: STATUS.PENDING,
            },
            {
              label: statusIcon({ status: STATUS.TODO, size: 20 }),
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
