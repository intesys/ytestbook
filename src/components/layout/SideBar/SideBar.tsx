import { Box, Group, Stack } from "@mantine/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useProject } from "../../../lib/operators/useProject";
import { navbarConfig, SIDEBAR_STATUS } from "./const";
import { Menu } from "./Menu/Menu";
import { Overview } from "./Overview/Overview";
import { OverviewHeader } from "./OverviewHeader";
import { QuickClose } from "./QuickClose";
import classes from "./sideBar.module.css";

export type WithNavbarStatus = {
  status: SIDEBAR_STATUS;
  toggle: (value?: React.SetStateAction<SIDEBAR_STATUS> | undefined) => void;
};

export const SideBar: React.FC<WithNavbarStatus> = ({ status, toggle }) => {
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
  }, [params, project.data, activeCaseId, pathname, navigate]);

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
    <Stack
      gap="md"
      style={{
        width: status
          ? navbarConfig[status as SIDEBAR_STATUS]
          : navbarConfig[SIDEBAR_STATUS.OPEN],
      }}
      className={clsx(classes.navbar)}
    >
      <Box
        className={clsx(classes.navbarHeader, {
          fullscreen: status === SIDEBAR_STATUS.FULLSCREEN,
          open: status === SIDEBAR_STATUS.OPEN,
          [classes.collapsed]: status === SIDEBAR_STATUS.COLLAPSED,
        })}
      >
        <Group>
          <OverviewHeader toggle={toggle} status={status} />
          <QuickClose toggle={toggle} status={status} />
        </Group>
      </Box>
      <Box>
        {status === SIDEBAR_STATUS.FULLSCREEN ? (
          <Overview toggle={toggle} />
        ) : status === SIDEBAR_STATUS.OPEN ? (
          <Box mt={25}>
            <Menu activeCaseId={activeCaseId} activeTestId={activeTestId} />
          </Box>
        ) : null}
      </Box>
    </Stack>
  );
};
