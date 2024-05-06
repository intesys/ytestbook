import { Box, Flex, Loader, Stack } from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import React from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useProject } from "../../lib/operators/useProject";
import { Header } from "../layout/Header/Header";
import { SideBar } from "../layout/SideBar/SideBar";
import { SIDEBAR_STATUS } from "../layout/SideBar/const";
import { TestCaseModal } from "../testCaseModal/TestCaseModal";
import classes from "./project.module.scss";

export function Project() {
  const params = useParams();
  const project = useProject(params.projectId);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [sidebarStatus, toggle] = useToggle<SIDEBAR_STATUS>([
    SIDEBAR_STATUS.FULLSCREEN,
    SIDEBAR_STATUS.COLLAPSED,
    SIDEBAR_STATUS.OPEN,
  ]);

  const goToSettings = () => {
    toggle(SIDEBAR_STATUS.OPEN);
    navigate(`/project/${params.projectId}/settings`);
  };

  if (!project || project.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w={"100%"}>
        <Loader color="blue" size="lg" />
      </Flex>
    );
  }

  return (
    <div className={classes.container}>
      <TestCaseModal
        title="Create test case"
        opened={opened}
        close={close}
        handleSubmit={project.createTestCase}
      />
      <Stack gap={0} style={{ height: "100vh", alignContent: "stretch" }}>
        <Box>
          <Header
            name={project.data.title}
            client={project.data.customer}
            handleSettingsClick={goToSettings}
          />
        </Box>
        <Flex style={{ flex: 1 }}>
          <Box>
            <SideBar
              toggle={toggle}
              status={sidebarStatus}
              openTestCaseModal={open}
            />
          </Box>
          <Box style={{ flexGrow: 2 }}>
            {sidebarStatus !== SIDEBAR_STATUS.FULLSCREEN && <Outlet />}
          </Box>
        </Flex>
      </Stack>
    </div>
  );
}
