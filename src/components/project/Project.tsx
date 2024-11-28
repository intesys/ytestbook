import {
  Box,
  Drawer,
  Flex,
  Group,
  Loader,
  Stack,
  TextInput,
} from "@mantine/core";
import { useField } from "@mantine/form";
import { useDisclosure, useHotkeys, useToggle } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { JsonEditor } from "json-edit-react";
import { Outlet, useNavigate, useParams } from "react-router";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { useServerName } from "../../lib/helpers/useServerName";
import { TOperatorLoaderStatus } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject";
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

  const [debugOpen, { toggle: toggleDebug, close: closeDebug }] =
    useDisclosure(false);
  const debugSearch = useField({ initialValue: "" });

  useHotkeys([["ctrl+D", () => toggleDebug()]]);

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

      {import.meta.env.DEV ? (
        <Drawer
          title="Debug"
          opened={debugOpen}
          onClose={closeDebug}
          size="50%"
          closeOnClickOutside={false}
        >
          <Group justify="flex-end">
            <TextInput
              leftSection={<IconSearch />}
              placeholder="Search in project..."
              {...debugSearch.getInputProps()}
            />
          </Group>
          <JsonEditor
            data={project}
            minWidth="100%"
            theme="githubLight"
            enableClipboard={false}
            searchText={debugSearch.getValue()}
            restrictAdd
            restrictEdit
            restrictDelete
            restrictDrag
            restrictTypeSelection
            collapseAnimationTime={200}
            stringTruncate={50}
            rootFontSize={12}
            collapse={2}
          />
        </Drawer>
      ) : null}
    </Box>
  );
}
