import React from "react";
import {
  Divider,
  Navbar,
  NavbarProps,
  Title,
  useMantineTheme,
} from "@mantine/core";

type OwnProps = Omit<NavbarProps, "children">;

const Sidebar: React.FC<OwnProps> = ({ ...navbarProps }) => {
  const theme = useMantineTheme();

  return (
    <Navbar {...navbarProps}>
      <Navbar.Section>
        <header>
          <Title order={6}>Sidebar</Title>
          <Divider />
        </header>
      </Navbar.Section>

      <Navbar.Section grow>
        <Title order={6}>Content</Title>
      </Navbar.Section>

      <Navbar.Section>
        <Divider />
        <Title order={6}>Footer</Title>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
