import React from "react";
import {
  Text,
  Navbar,
  NavbarProps,
  Title,
  Divider,
  useMantineTheme,
  Box,
  Space,
  Menu,
  Avatar,
} from "@mantine/core";
import { baseConfig } from "../../config/config";
import { ChatBubbleIcon, GearIcon, ImageIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

type OwnProps = Omit<NavbarProps, "children">;

const Sidebar: React.FC<OwnProps> = ({ ...navbarProps }) => {
  const theme = useMantineTheme();

  return (
    <Navbar padding={"md"} {...navbarProps}>
      <Navbar.Section>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2],
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
          })}
        >
          <Title order={4}>{baseConfig.testBookTitle}</Title>
          <Text size="xs">{baseConfig.testBookDesc}</Text>
          <Text size="xs">Version: {baseConfig.testBookVersion}</Text>
        </Box>
      </Navbar.Section>

      <Space h="md" />

      <Navbar.Section grow>
        <Title order={6}>Use Cases</Title>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <Avatar color="cyan" radius="xl">
              UC1
            </Avatar>
            <Text>Usecase 1</Text>
          </div>
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
