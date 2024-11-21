import { useIsFirstRender } from "@mantine/hooks";
import { SIDEBAR_STATUS } from "../layout/SideBar/const";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

/**
 * Sets the default sidebar status
 * @param toggleSidebarStatus
 */
export const useSetSidebarDefaultStatus = (
  toggleSidebarStatus: (
    value?: React.SetStateAction<SIDEBAR_STATUS> | undefined,
  ) => void,
) => {
  const params = useParams();
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    // Execute this check once
    if (!isFirstRender) {
      return;
    }

    // Open the sidebar if current route is a entity detail
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
