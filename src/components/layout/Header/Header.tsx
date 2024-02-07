import React from "react";
import { Link } from "react-router-dom";
import { TestbookInfo } from "../../../types/testbook";
import SvgIcon from "../../shared/SvgIcon/SvgIcon";
import classes from "./styles.module.scss";
import { TabsProps, ThemeIcon } from "@mantine/core";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { useToggle } from "@mantine/hooks";
import { SIDEBAR_STATUS } from "../SideBar/const";
import { Tabs } from "@mantine/core";

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      unstyled
      styles={(theme) => ({
        tab: {
          cursor: "pointer",

          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
            border: "1px solid green",
          },

          "&:not(:first-of-type)": {
            borderLeft: 0,
          },

          "&[data-active]": {
            backgroundColor: "#0F33CE",
            borderColor: "#0F33CE",
            color: "white",
            border: "1px solid red",
          },
        },

        tabIcon: {
          marginRight: theme.spacing.xs,
          display: "flex",
          alignItems: "center",
        },

        tabsList: {
          display: "flex",
        },
      })}
      {...props}
    />
  );
}

const Header: React.FC<TestbookInfo> = ({ name, client }) => {
  const [sidebarStatus, toggle] = useToggle<SIDEBAR_STATUS>([
    SIDEBAR_STATUS.COLLAPSED,
    SIDEBAR_STATUS.OPEN,
  ]);

  const _toggle =
    sidebarStatus === SIDEBAR_STATUS.COLLAPSED
      ? () => toggle(SIDEBAR_STATUS.OPEN)
      : () => toggle(SIDEBAR_STATUS.COLLAPSED);

  const ToggleIcon =
    sidebarStatus === SIDEBAR_STATUS.COLLAPSED
      ? RiArrowDownSFill
      : RiArrowUpSFill;

  return (
    <header className={classes.header}>
      <div className={classes.header_logo}>
        <Link to="/">
          <SvgIcon iconName="logo" wrapperStyle={classes.logo_wrapper} />
        </Link>
      </div>
      <div className={classes.divider} />
      <div className={classes.header_title}>
        <h4>
          {name}
          <ThemeIcon
            size="md"
            color="transparent"
            className={classes.icon}
            onClick={_toggle}
          >
            <ToggleIcon />
          </ThemeIcon>
        </h4>
        <small>Client: {client}</small>
      </div>
      <div className={classes.tabs}>
        <StyledTabs>
          <Tabs.List>
            <Tabs.Tab value="textbook">Textbook</Tabs.Tab>
            <Tabs.Tab value="report">Report</Tabs.Tab>
          </Tabs.List>
        </StyledTabs>
      </div>
    </header>
  );
};

export default Header;
