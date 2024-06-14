import { Box, Flex, Loader, Stack } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { Outlet, useNavigate, useParams } from "react-router";
import { useProject } from "../../lib/operators/useProject";
import { Header } from "../layout/Header/Header";
import { SideBar } from "../layout/SideBar/SideBar";
import { SIDEBAR_STATUS } from "../layout/SideBar/const";
import classes from "./project.module.css";

export function Project() {
  const params = useParams();
  const project = useProject(params.projectId);
  const navigate = useNavigate();

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
      <Stack gap={0} style={{ height: "100vh", alignContent: "stretch" }}>
        <Box>
          <Header
            title={project.data.title}
            customer={project.data.customer}
            handleSettingsClick={goToSettings}
          />
        </Box>
        <Flex className={classes.content} style={{ flex: 1 }}>
          <Box>
            <SideBar toggle={toggle} status={sidebarStatus} />
          </Box>
          <Box style={{ flexGrow: 2 }}>
            {sidebarStatus !== SIDEBAR_STATUS.FULLSCREEN && <Outlet />}
          </Box>
        </Flex>
      </Stack>
    </div>
  );
}
