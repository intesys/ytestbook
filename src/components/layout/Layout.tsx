import React from "react";
import { useState } from "react";
import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Sidebar
          fixed
          position={{ top: 0, left: 0 }}
          hiddenBreakpoint="sm"
          hidden={!showSidebar}
          width={{ sm: 300, lg: 400 }}
        />
      }
      header={
        <Header
          height={50}
          padding="md"
          sx={(t) => ({
            background: `#0f33ce`,
            borderBottom: `1px solid ${t.colors.dark}`,
          })}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={showSidebar}
                onClick={() => setShowSidebar((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group>
              <Text size={"sm"} weight={500}>
                yTestbook
              </Text>
            </Group>
          </div>
        </Header>
      }
    >
      <Text>Hurrà!</Text>
    </AppShell>
  );
};

export default Layout;
