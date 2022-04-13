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
      Tag: { status: TagStatus, operation: TagOperation },
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
      TagStatus === LOADING_STATUS.SUCCESS &&
      TagOperation === OPERATIONS_ACTIONS.SET
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
      TagStatus === LOADING_STATUS.ERROR &&
      TagOperation === OPERATIONS_ACTIONS.SET
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the saving process",
      });
    }

    // DELETE: SUCCESS
    if (
      TagStatus === LOADING_STATUS.SUCCESS &&
      TagOperation === OPERATIONS_ACTIONS.DELETE
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
      TagStatus === LOADING_STATUS.ERROR &&
      TagOperation === OPERATIONS_ACTIONS.DELETE
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the delete process",
      });
    }
  }, [TagStatus, TagOperation, actionType]);
};

export default useHandleStatus;
