import { useNotifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useUseCasesContext } from "../../../../context/useCasesContext";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../../../types";

const useHandleStatus = () => {
  const {
    state: {
      action: { type: actionType },
      usecase: { status: useCaseStatus, operation: useCaseOperation },
    },
    setAction,
    resetUseCase,
  } = useUseCasesContext();

  const notifications = useNotifications();

  const exitStrategy = () => {
    resetUseCase();
    setAction(ENTITIES_ACTIONS.IDLE);
  };

  useEffect(() => {
    // EDIT / NEW : SUCCESS
    if (
      useCaseStatus === LOADING_STATUS.SUCCESS &&
      useCaseOperation === OPERATIONS_ACTIONS.SET
    ) {
      notifications.showNotification({
        title:
          actionType === ENTITIES_ACTIONS.EDIT
            ? "Content saved"
            : "Content created",
        color: "green",
        message: "The Use Case was saved successfully",
      });
      exitStrategy();
    }

    // EDIT / NEW : ERROR
    if (
      useCaseStatus === LOADING_STATUS.ERROR &&
      useCaseOperation === OPERATIONS_ACTIONS.SET
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the saving process",
      });
    }

    // DELETE: SUCCESS
    if (
      useCaseStatus === LOADING_STATUS.SUCCESS &&
      useCaseOperation === OPERATIONS_ACTIONS.DELETE
    ) {
      notifications.showNotification({
        title: "Content deleted successfully",
        color: "green",
        message: "The Use Case was delete successfully",
      });
      exitStrategy();
    }

    // DELETE: ERROR
    if (
      useCaseStatus === LOADING_STATUS.ERROR &&
      useCaseOperation === OPERATIONS_ACTIONS.DELETE
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the delete process",
      });
    }
  }, [useCaseStatus, useCaseOperation, actionType]);
};

export default useHandleStatus;
