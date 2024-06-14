import { Group } from "@mantine/core";
import { Dispatch, SetStateAction, useCallback } from "react";
import { StatusEnum, TCollaborator } from "../../../../schema.ts";
import { AssigneeFilter } from "./OverviewFilters/AssigneeFilter/AssigneeFilter.tsx";
import { StatusFilter } from "./OverviewFilters/StatusFilter/StatusFilter.tsx";
import { TagsFilter } from "./OverviewFilters/TagsFilter/TagsFilter.tsx";
import { TextFilter } from "./OverviewFilters/TextFilter/TextFilter.tsx";

export type TOverviewFilters = {
  textFilter: string;
  statusFilter: StatusEnum[];
  tagsFilter: string[];
  assigneeFilter: TCollaborator | null;
};

type Props = {
  filters: TOverviewFilters;
  setFilters: Dispatch<SetStateAction<TOverviewFilters>>;
};

export const OverviewFilters = ({ filters, setFilters }: Props) => {
  const changeTextFilterHandler = useCallback(
    (value: TOverviewFilters["textFilter"]) => {
      setFilters((filters) => ({
        ...filters,
        textFilter: value,
      }));
    },
    [setFilters],
  );

  const changeStatusFilterHandler = useCallback(
    (values: TOverviewFilters["statusFilter"]) => {
      setFilters((filters) => ({
        ...filters,
        statusFilter: values,
      }));
    },
    [setFilters],
  );

  const changeTagsFilterHandler = useCallback(
    (values: TOverviewFilters["tagsFilter"]) => {
      setFilters((filters) => ({
        ...filters,
        tagsFilter: values,
      }));
    },
    [setFilters],
  );

  const changeAssigneeFilterHandler = useCallback(
    (values: TOverviewFilters["assigneeFilter"]) => {
      setFilters((filters) => ({
        ...filters,
        assigneeFilter: values,
      }));
    },
    [setFilters],
  );

  return (
    <Group>
      <TextFilter
        value={filters.textFilter}
        onChange={changeTextFilterHandler}
      />
      <StatusFilter
        values={filters.statusFilter}
        onChange={changeStatusFilterHandler}
      />
      <TagsFilter
        values={filters.tagsFilter}
        onChange={changeTagsFilterHandler}
        options={[
          "Backend",
          "Frontend",
          "UI",
          "UX",
          "Devops",
          "Category1",
          "Category2",
          "Category3",
          "Category4",
          "Category5",
          "Category6",
          "Category7",
          "Category8",
          "Category9",
          "Category10",
          "Category11",
          "Category12",
          "Category13",
          "Category14",
          "Category15",
          "Category16",
          "Category17",
          "Category18",
          "Category19",
          "Category20",
        ]}
      />
      <AssigneeFilter
        value={filters.assigneeFilter}
        onChange={changeAssigneeFilterHandler}
      />
    </Group>
  );
};
