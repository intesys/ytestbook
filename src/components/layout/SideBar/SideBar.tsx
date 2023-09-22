import { Group, Navbar as MuiNavbar, Stack } from "@mantine/core";
import React from "react";
import { SideBarLink } from "../SideBarLink/SideBarLink";
import { OverviewButton } from "./OverviewButton";
import { QuickClose } from "./QuickClose";
import { SIDEBAR_STATUS, navbarConfig } from "./const";
import { useNavbarStyles } from "./styles";
import Overview from "../Overview/Overview";

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
      return "testbook manager";
    case SIDEBAR_STATUS.OPEN:
      return "menu";
    case SIDEBAR_STATUS.COLLAPSED:
    default:
      return null;
  }
};

export const SideBar: React.FC<WithNavbarStatus> = ({ status, toggle }) => {
  const { classes } = useNavbarStyles();
  const content = getContent(status);

  return (
    <MuiNavbar
      width={{
        base: status
          ? navbarConfig[status as SIDEBAR_STATUS]
          : navbarConfig[SIDEBAR_STATUS.OPEN],
      }}
      className={classes.navbar}
    >
      <MuiNavbar.Section className={classes.navbar_header}>
        <Group>
          <OverviewButton toggle={toggle} status={status} />
          <QuickClose toggle={toggle} status={status} />
        </Group>
      </MuiNavbar.Section>
      <MuiNavbar.Section grow mt={40}>
        <Stack justify="center" spacing={0}>
          {content}
        </Stack>
      </MuiNavbar.Section>
    </MuiNavbar>
  );
};
