import { Box, Group, Tooltip, UnstyledButton } from "@mantine/core";
import classnames from "classnames";
import React from "react";
import { StatusIcon } from "../../misc/StatusIcon";
import { SIDEBAR_STATUS } from "../SideBar/const";
import useStyles from "./styles";
import { IOwnProps } from "./types";

export const SideBarLink: React.FC<IOwnProps> = ({
  id,
  title,
  status,
  active,
  navStatus,
  onClick,
}) => {
  const { classes } = useStyles();

  return (
    <Tooltip
      label={
        <>
          <div>{title}</div>
          <small>Status: {status}</small>
        </>
      }
      withArrow
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={() => onClick && id && onClick(id)}
        className={classnames(classes.link, { [classes.active]: active })}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {StatusIcon({ status })}
            {navStatus !== SIDEBAR_STATUS.COLLAPSED && (
              <Box ml={7}>{title}</Box>
            )}
          </Box>
        </Group>
      </UnstyledButton>
    </Tooltip>
  );
};
