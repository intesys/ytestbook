import { Flex, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useParams } from "react-router";
import { useProject } from "../../lib/operators/useProject";
import Header from "../layout/Header/Header";
import { NavBar } from "../navBar/NavBar";
import { CreateTestCaseModal } from "./CreateTestCaseModal";
import classes from "./project.module.scss";

export function Project() {
  const params = useParams();
  const project = useProject(params.projectId);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={classes.container}>
      <CreateTestCaseModal opened={opened} close={close} />
      {project.loading ? (
        <Flex align="center" justify="center" h="100dvh">
          <Loader color="blue" size="lg" />
        </Flex>
      ) : (
        <Flex direction={"column"}>
          <Header
            name={project.data.title}
            client={project.data.customer}
            handleActionClick={open}
          />

          <Flex mih={"100dvh"}>
            <NavBar />
            {project.data.testCases.length === 0 ? (
              <Flex align="center" justify="center" style={{ flex: 1 }}>
                <Text c={"gray"} ta={"center"}>
                  You have no test cases yet.
                  <br />
                  Create a new one to get started.
                </Text>
              </Flex>
            ) : (
              <Outlet />
            )}
          </Flex>
        </Flex>
      )}
    </div>
  );
}
