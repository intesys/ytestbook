import { useNotifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useTagsContext } from "../../../../context/useTagsContext";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../../../types";

const useHandleStatus = () => {
  const {
    state: {
      action: { type: actionType },
      tag: { status: tagStatus, operation: tagOperation },
    },
    setAction,
    resetTag,
  } = useTagsContext();

  const notifications = useNotifications();

  const exitStrategy = () => {
    resetTag();
    setAction(ENTITIES_ACTIONS.IDLE);
  };

  useEffect(() => {
    // EDIT / NEW : SUCCESS
    if (
      tagStatus === LOADING_STATUS.SUCCESS &&
      tagOperation === OPERATIONS_ACTIONS.SET
    ) {
      notifications.showNotification({
        title:
          actionType === ENTITIES_ACTIONS.EDIT
            ? "Content saved"
            : "Content created",
        color: "green",
        message: "The Tag was saved successfully",
      });
      exitStrategy();
    }

    // EDIT / NEW : ERROR
    if (
      tagStatus === LOADING_STATUS.ERROR &&
      tagOperation === OPERATIONS_ACTIONS.SET
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the saving process",
      });
    }

    // DELETE: SUCCESS
    if (
      tagStatus === LOADING_STATUS.SUCCESS &&
      tagOperation === OPERATIONS_ACTIONS.DELETE
    ) {
      notifications.showNotification({
        title: "Content deleted successfully",
        color: "green",
        message: "The Tag was delete successfully",
      });
      exitStrategy();
    }

    // DELETE: ERROR
    if (
      tagStatus === LOADING_STATUS.ERROR &&
      tagOperation === OPERATIONS_ACTIONS.DELETE
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the delete process",
      });
    }
  }, [tagStatus, tagOperation, actionType]);
};

export default useHandleStatus;
