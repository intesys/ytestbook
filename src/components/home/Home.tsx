import { Grid, Box, Button, Group, Loader, Table, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import AddCircle from "../../assets/icons/add_circle.svg";
import Logo from "../../assets/logo.svg";
import { useProjects } from "../../lib/operators/useProjects";
import { Action } from "../action/Action.tsx";
import { Modals } from "../modals/modals.ts";
import { RelativeDate } from "../relativeDate/RelativeDate";
import { EditableHtmlText } from "../shared/EditableHtmlText.tsx";
import { EditableText } from "../shared/EditableText.tsx";
import { JsonImporter } from "./JsonImporter";
import classes from "./home.module.css";
import { Link } from "react-router-dom";
import { useNetworkUrl } from "../../lib/operators/useNetworkUrl.ts";
import { useDocContext } from "../docContext/DocContext.tsx";

export const Home: React.FC = () => {
  const projects = useProjects();
  const navigate = useNavigate();
  const { docUrl } = useDocContext();
  const { networkUrl, isOfflineMode } = useNetworkUrl();

  const createTestbookAction = useCallback(
    () =>
      modals.openContextModal({
        modal: Modals.CreateTestbookModal,
        title: "Create project",
        centered: true,
        innerProps: {
          handleSubmit: projects.createProject,
        },
      }),
    [projects.createProject],
  );

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <Group justify="end" p="xs">
          <Box>
            <Text c="white">{docUrl}</Text>
            <Text c="white" fz="sm">
              {isOfflineMode ? "Offline-mode" : networkUrl}
            </Text>
          </Box>

          <Link to="/create">
            <Button variant="default">Change Repository</Button>
          </Link>
          <Link to="/setNetwork">
            <Button variant="default">Set Network</Button>
          </Link>
        </Group>

        <div className={classes.header}>
          <img src={Logo} height={78} width={78} alt="yTestbook" />
        </div>

        <Grid mb="sm" p={0} gutter={0}>
          <Grid.Col span={2} visibleFrom="md" />
          <Grid.Col span={{ base: 12, md: 8 }}>
            <EditableText
              value={projects.data?.title ?? ""}
              textProps={{
                size: "xl",
                c: "white",
                fw: "bold",
              }}
              name="repository title"
              onChange={(title) => projects.updateRepository({ title })}
            />
            <EditableHtmlText
              name="description"
              value={projects.data?.description}
              onChange={(description) =>
                projects.updateRepository({ description })
              }
              textProps={{
                c: "white",
              }}
            />
          </Grid.Col>
        </Grid>

        <Grid p="md">
          <Grid.Col span={2} visibleFrom="md" />
          <Grid.Col
            span={{
              base: 12,
              md: 4,
            }}
          >
            <Action
              title="Create project"
              label="Create a new testbook"
              icon={AddCircle}
              action={createTestbookAction}
            />
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              md: 4,
            }}
          >
            <JsonImporter />
          </Grid.Col>
          <Grid.Col span={2} visibleFrom="md" />
        </Grid>
      </div>

      <div className={classes.bottom}>
        <div className={classes.table}>
          {projects.loading ? (
            <Loader color="blue" m={62} />
          ) : projects.data.projects.length === 0 ? (
            <Text c={"gray"} maw={400} ta={"center"} m={62}>
              Your testbook projects list is currently empty. Create a new
              project to get started.
            </Text>
          ) : (
            <>
              <div className={classes.tableTitle}>Last testbooks</div>
              <Table
                verticalSpacing={10}
                horizontalSpacing={20}
                highlightOnHover
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                      <Text fw={"bold"}>Title</Text>
                    </Table.Th>
                    <Table.Th>
                      <Text fw={"bold"}>Customer</Text>
                    </Table.Th>
                    <Table.Th>
                      <Text fw={"bold"}>Created at</Text>
                    </Table.Th>
                    <Table.Th>
                      <Text fw={"bold"}>Last update</Text>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {projects.data.projects.map((item) => (
                    <Table.Tr
                      key={item.id}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        navigate(`/project/${item.id}`);
                      }}
                    >
                      <Table.Td>
                        <Text size="sm">{item.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{item.customer}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">
                          <RelativeDate timeStamp={item.createdAt} />
                        </Text>
                      </Table.Td>

                      <Table.Td>
                        <Text size="sm">
                          <RelativeDate timeStamp={item.lastUpdate} />
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
