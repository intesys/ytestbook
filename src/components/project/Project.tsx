import { Flex, Loader } from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { Outlet, useNavigate, useParams } from "react-router";
import { useProject } from "../../lib/operators/useProject";
import Header from "../layout/Header/Header";
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

  return (
    <div className={classes.container}>
      <TestCaseModal
        title="Create test case"
        opened={opened}
        close={close}
        handleSubmit={project.createTestCase}
      />
      {project.loading ? (
        <Flex align="center" justify="center" h="100dvh" w={"100%"}>
          <Loader color="blue" size="lg" />
        </Flex>
      ) : (
        <Flex direction={"column"}>
          <Header
            name={project.data.title}
            client={project.data.customer}
            handleSettingsClick={goToSettings}
          />

          <Flex mih={"100dvh"}>
            <SideBar
              toggle={toggle}
              status={sidebarStatus}
              openTestCaseModal={open}
            />
            <div
              className={
                sidebarStatus === SIDEBAR_STATUS.FULLSCREEN
                  ? classes.hidden
                  : classes.visible
              }
            >
              <Outlet />
            </div>
          </Flex>
        </Flex>
      )}
    </div>
  );
}
