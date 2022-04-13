import { useNotifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useMembersContext } from "../../../../context/useMembersContext";
import {
  ENTITIES_ACTIONS,
  LOADING_STATUS,
  OPERATIONS_ACTIONS,
} from "../../../../types";

const useHandleStatus = () => {
  const {
    state: {
      action: { type: actionType },
      member: { status: MemberStatus, operation: MemberOperation },
    },
    setAction,
    resetMember,
  } = useMembersContext();

  const notifications = useNotifications();

  const exitStrategy = () => {
    resetMember();
    setAction(ENTITIES_ACTIONS.IDLE);
  };

  useEffect(() => {
    // EDIT / NEW : SUCCESS
    if (
      MemberStatus === LOADING_STATUS.SUCCESS &&
      MemberOperation === OPERATIONS_ACTIONS.SET
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
      MemberStatus === LOADING_STATUS.ERROR &&
      MemberOperation === OPERATIONS_ACTIONS.SET
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the saving process",
      });
    }

    // DELETE: SUCCESS
    if (
      MemberStatus === LOADING_STATUS.SUCCESS &&
      MemberOperation === OPERATIONS_ACTIONS.DELETE
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
      MemberStatus === LOADING_STATUS.ERROR &&
      MemberOperation === OPERATIONS_ACTIONS.DELETE
    ) {
      notifications.showNotification({
        title: "Something was wrong",
        color: "red",
        message: "Something was wrong during the delete process",
      });
    }
  }, [MemberStatus, MemberOperation, actionType]);
};

export default useHandleStatus;
