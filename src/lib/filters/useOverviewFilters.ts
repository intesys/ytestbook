import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TOverviewFilters } from "../../components/layout/SideBar/Overview/OverviewFilters.tsx";
import { TCase } from "../../schema.ts";
import { useProject } from "../operators/useProject.ts";
import { filterCases } from "./overviewFilters.utils.ts";

const initialFilters: TOverviewFilters = {
  textFilter: "",
  statusFilter: [],
  tagsFilter: [],
  assigneeFilter: null,
};

type TUseOverviewFilters = (testCases: TCase[]) => {
  filters: TOverviewFilters;
  setFilters: Dispatch<SetStateAction<TOverviewFilters>>;
  filteredTestCases: TCase[];
};

export const useOverviewFilters: TUseOverviewFilters = (testCases) => {
  const params = useParams();
  const project = useProject(params.projectId);
  const [filters, setFilters] = useState<TOverviewFilters>(initialFilters);
  const [filteredTestCases, setFilteredTestCases] = useState<TCase[]>([]);

  useEffect(() => {
    const filtered = filterCases(testCases, filters, project);
    setFilteredTestCases(filtered);
  }, [testCases, filters]);

  return { filters, setFilters, filteredTestCases };
};
