import { useToggle } from "@mantine/hooks";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useTestbook } from "../../../hooks/useTestbook";
import { TestbookInfo } from "../../../types/testbook";
import Header from "../Header/Header";
import { SideBar } from "../SideBar/SideBar";
import { SIDEBAR_STATUS } from "../SideBar/const";
import { Box, Flex, Stack } from "@mantine/core";

const Layout: React.FC = () => {
  const { testbook, testcase, test, step } = useParams();
  const [testbookInfo] = useTestbook(testbook ?? "");
  const [sidebarStatus, toggle] = useToggle<SIDEBAR_STATUS>([
    SIDEBAR_STATUS.FULLSCREEN,
    SIDEBAR_STATUS.COLLAPSED,
    SIDEBAR_STATUS.OPEN,
  ]);

  return (
    <Stack gap={0} style={{ height: "100vh", alignContent: "stretch" }}>
      <Box>
        <Header {...(testbookInfo as TestbookInfo)} />
      </Box>
      <Flex style={{ flex: 1 }}>
        <Box>
          <SideBar toggle={toggle} status={sidebarStatus} />
        </Box>
        <Box py={20} px={30} style={{ flexGrow: 2 }}>
          {sidebarStatus !== SIDEBAR_STATUS.FULLSCREEN && <Outlet />}
        </Box>
      </Flex>
    </Stack>
  );
};

export default Layout;
