import React from "react";
import { Text, useMantineTheme, Anchor } from "@mantine/core";
import { ISecondaryMenu } from "./types";
import { Link, useLocation } from "react-router-dom";

const Submenu: React.FC<ISecondaryMenu> = ({ item }) => {
  const theme = useMantineTheme();
  const location = useLocation();

  return (
    <Anchor
      component={Link}
      underline={false}
      to={item.path}
      sx={(t) => ({
        display: "block",
        padding: `${t.spacing.xs}px ${t.spacing.sm}px`,
        borderLeft: `1px solid ${
          t.colorScheme === "dark" ? t.colors.dark[5] : t.colors.gray[1]
        }`,
        backgroundColor:
          location.pathname === item.path
            ? t.colorScheme === "dark"
              ? t.colors.dark[6]
              : t.colors.gray[1]
            : "none",
        "&:hover": {
          backgroundColor:
            t.colorScheme === "dark" ? t.colors.dark[6] : t.colors.gray[1],
        },
      })}
    >
      <Text size="sm" color={theme.colors.dark[1]}>
        {item.label}
      </Text>
    </Anchor>
  );
};

export default Submenu;
