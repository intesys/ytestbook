import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router";
import { SIDEBAR_STATUS } from "@/components/layout/SideBar/const";

/**
 * Sets the default sidebar status
 * @param toggleSidebarStatus
 */
export const useSetSidebarDefaultStatus = (
  toggleSidebarStatus: (value?: SetStateAction<SIDEBAR_STATUS>) => void
) => {
  const params = useParams();
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    // Execute this check once
    if (isFirstRender) {
      if (params.caseId || params.testId || params.stepId) {
        // Open the sidebar if current route is an entity detail
        toggleSidebarStatus(SIDEBAR_STATUS.OPEN);
      }

      setIsFirstRender(false);
    }
  }, [
    isFirstRender,
    params.caseId,
    params.stepId,
    params.testId,
    toggleSidebarStatus,
  ]);
};
