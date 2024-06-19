import { Loader, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { useNavigate } from "react-router";
import AddCircle from "../../assets/icons/add_circle.svg";
import Logo from "../../assets/logo.svg";
import { useProjects } from "../../lib/operators/useProjects";
import { RelativeDate } from "../relativeDate/RelativeDate";
import { Action } from "./Action";
import { CreateTestbookModal } from "./CreateTestbookModal";
import { JsonImporter } from "./JsonImporter";
import classes from "./home.module.scss";

export const Home: React.FC = () => {
  const projects = useProjects();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className={classes.container}>
      <CreateTestbookModal opened={opened} close={close} />
      <div className={classes.top}>
        <div className={classes.header}>
          <img src={Logo} height={78} width={78} alt="yTestbook" />
        </div>
        <div className={classes.actions}>
          <Action
            title="Create project"
            label="Create a new testbook"
            icon={AddCircle}
            action={open}
          />
          <JsonImporter />
        </div>
      </div>

      <div className={classes.bottom}>
        <div className={classes.table}>
          {projects.loading ? (
            <Loader color="blue" m={62} />
          ) : projects.data.length === 0 ? (
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
                  {projects.data.map((item) => (
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
