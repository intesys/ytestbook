import { Group, ThemeIcon, Text } from "@mantine/core";
import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { WithNavbarStatus } from "./SideBar";
import { SIDEBAR_STATUS } from "./const";
import classes from "./overviewHeader.module.css";

export const OverviewHeader: React.FC<WithNavbarStatus> = ({
  status,
  toggle,
}) => {
  const _toggle =
    status === SIDEBAR_STATUS.FULLSCREEN
      ? () => toggle(SIDEBAR_STATUS.OPEN)
      : () => toggle(SIDEBAR_STATUS.FULLSCREEN);

  const ToggleIcon =
    status === SIDEBAR_STATUS.FULLSCREEN ? MdSkipPrevious : MdSkipNext;

  // Show only eye icon
  if (status === SIDEBAR_STATUS.COLLAPSED) {
    return (
      <Group
        className={classes.group}
        justify="space-between"
        onClick={() => toggle(SIDEBAR_STATUS.OPEN)}
      >
        <ThemeIcon size="xl" color="transparent" className={classes.icon}>
          <MdOutlineRemoveRedEye />
        </ThemeIcon>
        <Text hiddenFrom="sm" fw="bold">
          OVERVIEW
        </Text>
        <ThemeIcon size="xl" color="transparent" />
      </Group>
    );
  }

  // Show all elements
  return (
    <Group className={classes.group} justify="space-between" onClick={_toggle}>
      <ThemeIcon size="xl" color="transparent" className={classes.icon}>
        <MdOutlineRemoveRedEye />
      </ThemeIcon>
      <span>OVERVIEW</span>
      <ThemeIcon size="xl" color="transparent">
        <ToggleIcon />
      </ThemeIcon>
    </Group>
  );
};
