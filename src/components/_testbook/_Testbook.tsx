import { Flex, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useParams } from "react-router";
import { useProject } from "../../lib/operators/useProject";
import { TCase } from "../../schema";
import Header from "../layout/Header/Header";
import { CreateTestCaseModal } from "./CreateTestCaseModal";
import classes from "./testbook.module.scss";

export function _Testbook() {
  const params = useParams();
  const project = useProject(params.testbookId);
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);
  console.log(project);

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
            <TestCase testCase={project.data.testCases[active]} />
          )}
        </Flex>
      )}
    </div>
  );
}

function TestCase({ testCase }: { testCase: TCase }) {
  const params = useParams();
  const project = useProject(params.testbookId);
  return (
    <div>
      <button onClick={() => project.removeTestCase(testCase.id)}>
        delete test case
      </button>
      <Text>{testCase.title}</Text>
    </div>
  );
}
