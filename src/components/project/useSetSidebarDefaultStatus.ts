import { SetStateAction, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useIsFirstRender } from "@mantine/hooks";
import { SIDEBAR_STATUS } from "@/components/layout/SideBar/const";

/**
 * Sets the default sidebar status
 * @param toggleSidebarStatus
 */
export const useSetSidebarDefaultStatus = (
  toggleSidebarStatus: (value?: SetStateAction<SIDEBAR_STATUS>) => void
) => {
  const params = useParams();
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    // Execute this check once
    if (!isFirstRender) {
      return;
    }

    // Open the sidebar if current route is an entity detail
    if (params.caseId || params.testId || params.stepId) {
      toggleSidebarStatus(SIDEBAR_STATUS.OPEN);
    }
  }, [
    isFirstRender,
    params.caseId,
    params.stepId,
    params.testId,
    toggleSidebarStatus,
  ]);
};
