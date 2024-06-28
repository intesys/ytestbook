import { TOverviewFilters } from "../../components/layout/SideBar/Overview/OverviewFilters.tsx";
import { TCase, TStep, TTest } from "../../types/schema.ts";
import { TUseProject } from "../operators/types.ts";
import {
  checkAssigneeFilter,
  checkStatusFilter,
  checkTagsFilter,
  checkTextFilter,
} from "./overviewFilters.ts";

export const filterCases = (
  cases: TCase[],
  filters: TOverviewFilters,
  project: TUseProject,
) => {
  return cases.reduce((accCase: TCase[], nextCase: TCase) => {
    const tags = project.getTagsByCaseId(nextCase.id);
    const assignees = project.getAssigneesByCaseId(nextCase.id);

    const filteredTests = nextCase.tests.reduce(
      (accTest: TTest[], nextTest: TTest) => {
        const tags = project.getTagsByTestId(nextTest.id);
        const assignees = project.getAssigneesByTestId(nextTest.id);

        const filteredSteps = nextTest.steps.reduce(
          (accStep: TStep[], nextStep: TStep) => {
            // Find if each step is visible or filtered

            const textFilterPasses = checkTextFilter(
              nextStep,
              ["title", "description"],
              filters,
            );

            const statusFilterPasses = checkStatusFilter(
              nextStep,
              ["status"],
              filters,
            );

            const tagsFilterPasses = checkTagsFilter(tags, filters);
            const assigneeFilterPasses = checkAssigneeFilter(
              assignees,
              filters,
            );

            // if the filters are off, or the step is included by the filters
            if (
              textFilterPasses &&
              statusFilterPasses &&
              tagsFilterPasses &&
              assigneeFilterPasses
            ) {
              accStep.push(nextStep);
            }

            return accStep;
          },
          [],
        );

        // Find if each Test is visible or filtered

        const textFilterPasses = checkTextFilter(
          nextTest,
          ["title", "description"],
          filters,
        );

        const statusFilterPasses = checkStatusFilter(
          nextTest,
          ["status"],
          filters,
        );
        const tagsFilterPasses = checkTagsFilter(tags, filters);
        const assigneeFilterPasses = checkAssigneeFilter(assignees, filters);

        // if the filters are off, filteredSteps has at least 1 value, or the test is included by the filters
        if (
          filteredSteps.length > 0 ||
          (textFilterPasses &&
            statusFilterPasses &&
            tagsFilterPasses &&
            assigneeFilterPasses)
        ) {
          const filtered: TTest = { ...nextTest, steps: filteredSteps };
          accTest.push(filtered);
        }
        return accTest;
      },
      [],
    );

    // Find if each TestCase is visible or filtered
    const textFilterPasses = checkTextFilter(
      nextCase,
      ["title", "description"],
      filters,
    );

    const statusFilterPasses = checkStatusFilter(nextCase, ["status"], filters);

    const tagsFilterPasses = checkTagsFilter(tags, filters);
    const assigneeFilterPasses = checkAssigneeFilter(assignees, filters);

    // if the filters are off, filteredTests has at least 1 value, or the testCase is included by the filters
    if (
      filteredTests.length > 0 ||
      (textFilterPasses &&
        statusFilterPasses &&
        tagsFilterPasses &&
        assigneeFilterPasses)
    ) {
      const filtered: TCase = { ...nextCase, tests: filteredTests };
      accCase.push(filtered);
    }
    return accCase;
  }, []);
};
