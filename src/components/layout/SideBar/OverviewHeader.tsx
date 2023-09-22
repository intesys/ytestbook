import { Box, Button, Group, ThemeIcon } from "@mantine/core";
import classnames from "classnames";
import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";
import { WithNavbarStatus } from "./SideBar";
import { SIDEBAR_STATUS } from "./const";
import { useOverviewButtonStyles } from "./styles";

export const OverviewHeader: React.FC<WithNavbarStatus> = ({
  status,
  toggle,
}) => {
  const { classes } = useOverviewButtonStyles();
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
        position="center"
        onClick={() => toggle(SIDEBAR_STATUS.OPEN)}
      >
        <ThemeIcon size="xl" color="transparent" className={classes.icon}>
          <MdOutlineRemoveRedEye />
        </ThemeIcon>
      </Group>
    );
  }

  // Show all elements
  return (
    <Group className={classes.group} position="apart" onClick={_toggle}>
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
