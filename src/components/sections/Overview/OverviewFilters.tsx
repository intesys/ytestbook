import { Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { StatusEnum } from "../../../api/models/enum";
import { statusIcon } from "../../../lib/misc";
import MultipleSelectField from "../../ui/MultipleSelectField/MultipleSelectField";
import SegmentedField from "../../ui/SegmentedField/SegmentedField";
import TextField from "../../ui/TextField/TextField";
import { OverviewFiltersProps } from "./types";

const OverviewFilters: React.FC<OverviewFiltersProps> = () => {
  return (
    <>
      <Group>
        <TextField placeholder="Search" rightSection={<IconSearch />} />
        <SegmentedField
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
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
        />
        <MultipleSelectField
          placeholder="Filter assegnee"
          data={[
            { value: "1", label: "Marco" },
            { value: "2", label: "Alessandro" },
            { value: "3", label: "Filippo" },
            { value: "4", label: "Mario" },
          ]}
        />
      </Group>
    </>
  );
};

export default OverviewFilters;
