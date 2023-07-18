import React from "react";
import { Group, Box, UnstyledButton, Tooltip } from "@mantine/core";
import useStyles from "./styles";
import { IOwnProps } from "./types";
import { statusIcon } from "../../../lib/misc";
import classnames from "classnames";
import { NAVBAR_STATUS_ENUM } from "../Navbar/const";

export const NavbarLink: React.FC<IOwnProps> = ({
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
            {statusIcon(status || "")}
            {navStatus !== NAVBAR_STATUS_ENUM.collapsed && <Box ml={7}>{title}</Box>}
          </Box>
        </Group>
      </UnstyledButton>
    </Tooltip>
  );
};
