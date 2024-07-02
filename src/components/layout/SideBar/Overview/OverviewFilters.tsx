import { Group } from "@mantine/core";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../../../../lib/operators/useProject.ts";
import { StatusEnum, TCollaborator } from "../../../../types/schema.ts";
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
  const params = useParams();
  const project = useProject(params.projectId);

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
        options={project.data?.allTags ?? []}
      />
      <AssigneeFilter
        value={filters.assigneeFilter}
        onChange={changeAssigneeFilterHandler}
        options={project.data?.collaborators ?? []}
      />
    </Group>
  );
};
