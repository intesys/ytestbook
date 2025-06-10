import { TOverviewFilters } from "../../components/layout/SideBar/Overview/OverviewFilters.tsx";
import { StatusEnum, TCollaborator } from "../../types/schema.ts";

export function checkTextFilter<T extends Record<string, unknown>>(
  obj: T,
  keys: Array<keyof T>,
  filters: TOverviewFilters,
) {
  const lowerFilter = filters.textFilter.toLowerCase();

  return (
    filters.textFilter === "" || // Filter is disabled
    keys.some(
      (key) =>
        (obj[key] ?? "").toString().toLowerCase().indexOf(lowerFilter) >= 0,
    )
  );
}

export function checkStatusFilter<T extends Record<string, unknown>>(
  obj: T,
  keys: Array<keyof T>,
  filters: TOverviewFilters,
) {
  return (
    filters.statusFilter.length === 0 || // Filter is disabled
    keys.some((key) => filters.statusFilter.includes(obj[key] as StatusEnum))
  );
}

export function checkTagsFilter(tags: string[], filters: TOverviewFilters) {
  return (
    filters.tagsFilter.length === 0 || // Filter is disabled
    filters.tagsFilter.some((tag) => tags.includes(tag))
  );
}

export function checkAssigneeFilter(
  assignees: TCollaborator[],
  filters: TOverviewFilters,
) {
  return (
    filters.assigneeFilter === null || // Filter is disabled
    assignees.includes(filters.assigneeFilter)
  );
}
