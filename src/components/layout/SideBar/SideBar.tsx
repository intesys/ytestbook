import { Box, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useProject } from "../../../lib/operators/useProject";
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

export const SideBar: React.FC<
  WithNavbarStatus & { openTestCaseModal: () => void }
> = ({ status, toggle, openTestCaseModal }) => {
  const params = useParams();
  const project = useProject(params.projectId);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [activeCaseId, setActiveCaseId] = useState("");
  const [activeTestId, setActiveTestId] = useState("");

  useEffect(() => {
    if (pathname.includes("/settings")) return;
    if (pathname.includes("/empty")) return;
    if (params.caseId || !project.data) return;
    if (project.data.testCases.length === 0) {
      /**If there's no caseId defined in the URL and no test cases, go to Empty  */
      navigate(`/project/${project.data.id}/empty`);
    } else {
      /**If there's no caseId defined in the URL, it sets the first testCase as the active one  */
      const caseId = project.data.testCases[0].id;
      setActiveCaseId(caseId);
      navigate(`/project/${project.data.id}/testCase/${caseId}`);
    }
  }, [params, project.data, activeCaseId, pathname]);

  useEffect(() => {
    if (params.caseId) {
      setActiveCaseId(params.caseId);
    }

    if (params.testId) {
      setActiveTestId(params.testId);
    } else {
      setActiveTestId("");
    }
  }, [params]);

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
      <Box mt={25}>
        {status === SIDEBAR_STATUS.FULLSCREEN ? (
          <Overview toggle={toggle} openTestCaseModal={openTestCaseModal} />
        ) : status === SIDEBAR_STATUS.OPEN ? (
          <Menu activeCaseId={activeCaseId} activeTestId={activeTestId} />
        ) : null}
      </Box>
    </Box>
  );
};
