import { Box, Flex, Loader, Stack } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { Outlet, useNavigate, useParams } from "react-router";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { useServerName } from "../../lib/helpers/useServerName";
import { TOperatorLoaderStatus } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject";
import { Debug } from "../debug/Debug.tsx";
import { Header } from "../layout/Header/Header";
import { SIDEBAR_STATUS } from "../layout/SideBar/const";
import { SideBar } from "../layout/SideBar/SideBar";
import { NotFound } from "../notFound/NotFound";
import classes from "./project.module.css";
import { useSetSidebarDefaultStatus } from "./useSetSidebarDefaultStatus";

export function Project() {
  const params = useParams();
  const project = useProject(params.projectId);
  const navigate = useNavigate();
  const serverName = useServerName();

  const [sidebarStatus, toggleSidebarStatus] = useToggle<SIDEBAR_STATUS>([
    SIDEBAR_STATUS.FULLSCREEN,
    SIDEBAR_STATUS.COLLAPSED,
    SIDEBAR_STATUS.OPEN,
  ]);

  useSetSidebarDefaultStatus(toggleSidebarStatus);

  const goToSettings = () => {
    toggleSidebarStatus(SIDEBAR_STATUS.OPEN);
    navigate(
      routesHelper.projectDetailSettings(serverName, params.projectId ?? ""),
    );
  };

  if (project.status === TOperatorLoaderStatus.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w={"100%"}>
        <Loader color="blue" size="lg" />
      </Flex>
    );
  }

  if (project.status === TOperatorLoaderStatus.error) {
    return <NotFound />;
  }

  return (
    <Box className={classes.container}>
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
            <SideBar toggle={toggleSidebarStatus} status={sidebarStatus} />
          </Box>
          <Box style={{ flexGrow: 2 }}>
            {sidebarStatus !== SIDEBAR_STATUS.FULLSCREEN && <Outlet />}
          </Box>
        </Flex>
      </Stack>

      {import.meta.env.DEV ? <Debug data={project} /> : null}
    </Box>
  );
}
