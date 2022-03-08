import React from "react";
import { useState } from "react";
import { AppShell, Text } from "@mantine/core";
import Sidebar from "./Sidebar";
import { Header } from "./Header";

const Layout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);

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
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      }
    >
      <Text>Hurrà!</Text>
    </AppShell>
  );
};

export default Layout;
