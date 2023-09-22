import { useToggle } from "@mantine/hooks";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { SideBar } from "../SideBar/SideBar";
import { SIDEBAR_STATUS } from "../SideBar/const";
import useStyles from "./styles";
import { useTestbook } from "../../../hooks/useTestbook";
import { TestbookInfo } from "../../../types/pouchDB";

const Layout: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();

  const [testbookInfo] = useTestbook(testbook ?? "");

  console.table(testbookInfo);

  const { classes } = useStyles();
  const [sidebarStatus, toggle] = useToggle<SIDEBAR_STATUS>([
    SIDEBAR_STATUS.FULLSCREEN,
    SIDEBAR_STATUS.COLLAPSED,
    SIDEBAR_STATUS.OPEN,
  ]);

  return (
    <div className={classes.app_layout}>
      <div className={classes.app_header}>
        <Header {...(testbookInfo as TestbookInfo)} />
      </div>
      <div className={classes.app_wrapper}>
        <div className={classes.app_sidebar}>
          <SideBar toggle={toggle} status={sidebarStatus} />
        </div>
        {sidebarStatus !== SIDEBAR_STATUS.FULLSCREEN && (
          <div className={classes.app_main}>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
