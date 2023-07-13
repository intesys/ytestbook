import React from "react";
import { Group, Box, ThemeIcon, UnstyledButton } from "@mantine/core";
import { FaBeer } from "react-icons/fa";
import useStyles from "./styles";
import { IOwnProps } from "./types";
import { statusIcon } from "../../../lib/misc";

export const NavbarLinks: React.FC<IOwnProps> = ({ id, title, status }) => {
  const { classes } = useStyles();

  return (
    <>
      <UnstyledButton className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {statusIcon(status || "")}
            <Box ml={7}>{title}</Box>
          </Box>
        </Group>
      </UnstyledButton>
    </>
  );
};
