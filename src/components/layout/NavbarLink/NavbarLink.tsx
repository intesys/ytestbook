import { Box, Group, Tooltip, UnstyledButton } from "@mantine/core";
import classnames from "classnames";
import React from "react";
import { statusIcon } from "../../../lib/misc";
import { NAVBAR_STATUS_ENUM } from "../Navbar/const";
import useStyles from "./styles";
import { IOwnProps } from "./types";

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
            {statusIcon({ status })}
            {navStatus !== NAVBAR_STATUS_ENUM.collapsed && (
              <Box ml={7}>{title}</Box>
            )}
          </Box>
        </Group>
      </UnstyledButton>
    </Tooltip>
  );
};
