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
  Text,
  ActionIcon,
  useMantineColorScheme,
  Code,
  MultiSelect,
} from "@mantine/core";
import logoWhite from "../../../assets/static/logo-w.svg";
import logoBlu from "../../../assets/static/logo-b.svg";
import { MdDarkMode, MdDownload, MdUpload, MdWbSunny } from "react-icons/md";
import { GoMarkGithub } from "react-icons/go";
import { baseConfig } from "../../../config/config";
import { IOwnProps } from "./types";
import { Link } from "react-router-dom";

export const Header: React.FC<IOwnProps & Omit<HeaderProps, "children">> = ({
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
      p="md"
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

          <Title order={4}>{baseConfig.testBookTitle}</Title>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Code>{baseConfig.testBookVersion}</Code>
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Text size="xs" sx={{ lineHeight: "1" }}>
              {baseConfig.testBookDesc}
            </Text>
          </MediaQuery>
        </Group>

        <Group ml={"auto"}>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <MultiSelect
              data={[
                { value: "React", label: "React" },
                { value: "Angular", label: "Angular" },
                { value: "Svelte", label: "Svelte" },
                { value: "Vue", label: "Vue" },
              ]}
              maxSelectedValues={3}
              placeholder="Filter entities by tag"
              nothingFound="Nothing found"
              limit={20}
              searchable
              clearable
            />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <ActionIcon
              color={dark ? "gray" : "gray"}
              onClick={() => {}}
              variant="outline"
              title="Import Database"
            >
              <MdUpload style={{ width: 16, height: 16 }} />
            </ActionIcon>
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <ActionIcon
              color={dark ? "gray" : "gray"}
              onClick={() => {}}
              variant="outline"
              title="Export Database"
            >
              <MdDownload style={{ width: 16, height: 16 }} />
            </ActionIcon>
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <ActionIcon
              component={Link}
              target="_blank"
              color={dark ? "gray" : "violet"}
              to={{ pathname: "https://github.com/intesys/ytestbook" }}
              variant="light"
              title="Source Code - GitHub"
            >
              <GoMarkGithub style={{ width: 16, height: 16 }} />
            </ActionIcon>
          </MediaQuery>
          <ActionIcon
            variant="light"
            color={dark ? "yellow" : "dark"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? (
              <MdWbSunny style={{ width: 16, height: 16 }} />
            ) : (
              <MdDarkMode style={{ width: 16, height: 16 }} />
            )}
          </ActionIcon>
        </Group>
      </div>
    </MHeader>
  );
};
