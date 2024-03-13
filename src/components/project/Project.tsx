import { Flex, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useProject } from "../../lib/operators/useProject";
import Header from "../layout/Header/Header";
import { CreateTestCaseModal } from "./CreateTestCaseModal";
import classes from "./testbook.module.scss";

export function Project() {
  const params = useParams();
  const project = useProject(params.projectId);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [activeTestCase, setActiveTestCase] = useState(0);

  useEffect(() => {
    if (!params.caseId && project.data && project.data?.testCases.length > 0) {
      navigate(
        `/project/${project.data.id}/testCase/${project.data.testCases[activeTestCase].id}`,
      );
    }
  }, [params, project.data, activeTestCase]);

  return (
    <div className={classes.container}>
      <CreateTestCaseModal opened={opened} close={close} />
      {project.loading ? (
        <Flex align="center" justify="center" h="100dvh">
          <Loader color="blue" size="lg" />
        </Flex>
      ) : (
        <Flex direction={"column"} h="100dvh">
          <Header
            name={project.data.title}
            client={project.data.customer}
            handleActionClick={open}
          />

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
      )}
    </div>
  );
}
