import React, { useState } from "react";
import { Text, useMantineTheme, ThemeIcon, Anchor, Group } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import Submenu from "./Submenu";
import { IPrimaryMenu } from "./types";

const Primary: React.FC<IPrimaryMenu> = ({ item }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const theme = useMantineTheme();
  const location = useLocation();

  const renderSubmenu = () => {
    return item.children?.map((item, key) => <Submenu item={item} />);
  };

  return (
    <>
      <Anchor
        component={Link}
        underline={false}
        to={item.path ? item.path : undefined}
        onClick={!item.path ? () => setOpenSubmenu(!openSubmenu) : undefined}
        sx={(t) => ({
          display: "block",
          padding: `${t.spacing.xs}px`,
          borderRadius: "5px",
          color:
            location.pathname === item.path || openSubmenu
              ? t.colorScheme === "dark"
                ? t.colors.gray[1]
                : t.colors.primary[0]
              : t.colors.gray[6],
          backgroundColor:
            location.pathname === item.path || openSubmenu
              ? t.colorScheme === "dark"
                ? t.colors.dark[5]
                : t.colors.gray[2]
              : "none",
          "&:hover": {
            backgroundColor:
              t.colorScheme === "dark" ? t.colors.dark[5] : t.colors.gray[2],
          },
        })}
      >
        <Group>
          <ThemeIcon color={theme.colorScheme === "dark" ? "gray" : "primary"}>
            {item.icon}
          </ThemeIcon>
          <Text>{item.label}</Text>
        </Group>
      </Anchor>
      {openSubmenu && item.children ? renderSubmenu() : null}
    </>
  );
};

export default Primary;
