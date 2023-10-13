import { Box, Group } from "@mantine/core";
import React from "react";
import { Menu } from "./Menu/Menu";
import { Overview } from "./Overview/Overview";
import { OverviewHeader } from "./OverviewHeader";
import { QuickClose } from "./QuickClose";
import { SIDEBAR_STATUS, navbarConfig } from "./const";
import classes from "./sideBar.module.scss";

export type WithNavbarStatus = {
  status: SIDEBAR_STATUS;
  toggle: (value?: React.SetStateAction<SIDEBAR_STATUS> | undefined) => void;
};

/**
 * Render different component based on sidebar status
 */
const getContent = (status: SIDEBAR_STATUS) => {
  switch (status) {
    case SIDEBAR_STATUS.FULLSCREEN:
      return <Overview />;
    case SIDEBAR_STATUS.OPEN:
      return <Menu />;
    case SIDEBAR_STATUS.COLLAPSED:
    default:
      return null;
  }
};

export const SideBar: React.FC<WithNavbarStatus> = ({ status, toggle }) => {
  const content = getContent(status);

  return (
    <Box
      style={{
        width: status
          ? navbarConfig[status as SIDEBAR_STATUS]
          : navbarConfig[SIDEBAR_STATUS.OPEN],
      }}
      className={classes.navbar}
    >
      <Box className={classes.navbarHeader}>
        <Group>
          <OverviewHeader toggle={toggle} status={status} />
          <QuickClose toggle={toggle} status={status} />
        </Group>
      </Box>
      <Box mt={40}>{content}</Box>
    </Box>
  );
};
