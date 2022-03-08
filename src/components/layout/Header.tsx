import React from "react";
import {
  Burger,
  Group,
  Header as MHeader,
  HeaderProps,
  MediaQuery,
  Image,
  useMantineTheme,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import logoWhite from "../../assets/static/logo-w.svg";
import logoBlu from "../../assets/static/logo-b.svg";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

interface OwnProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<OwnProps & Omit<HeaderProps, "children">> = ({
  showSidebar,
  setShowSidebar,
  ...headerProps
}) => {
  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <MHeader
      {...headerProps}
      padding="md"
      sx={(t) => ({
        borderBottom: `1px solid ${t.colors.dark}`,
      })}
    >
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
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
          <Image
            src={theme.colorScheme === "light" ? logoBlu : logoWhite}
            alt="Random unsplash image"
            height={20}
          />
          <Title order={3}>yTestbook</Title>
        </Group>
        <Group ml={"auto"}>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? (
              <SunIcon style={{ width: 18, height: 18 }} />
            ) : (
              <MoonIcon style={{ width: 18, height: 18 }} />
            )}
          </ActionIcon>
        </Group>
      </div>
    </MHeader>
  );
};
