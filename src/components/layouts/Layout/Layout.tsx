import React from "react";
import { useState } from "react";
import { AppShell, Text } from "@mantine/core";
import Sidebar from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";

const Layout: React.FC = ({ children }) => {
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
          width={{ sm: 240, lg: 300 }}
        />
      }
      header={
        <Header
          height={65}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
