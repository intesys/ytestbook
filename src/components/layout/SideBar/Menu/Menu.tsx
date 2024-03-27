import { Anchor, Button, Flex, List, Text } from "@mantine/core";
import classnames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useProject } from "../../../../lib/operators/useProject";
import { StatusIcon } from "../../../statusIcon/StatusIcon";
import { StatusMenu } from "../../../statusMenu/StatusMenu";
import { Trail } from "../../../trail/Trail";
import classes from "./styles.module.scss";

export const Menu: React.FC<{ activeCaseId: string; activeTestId: string }> = ({
  activeCaseId,
  activeTestId,
}) => {
  const params = useParams();
  const project = useProject(params.projectId);

  return (
    <List
      className={classnames(classes.navList)}
      miw={300}
      listStyleType="none"
    >
      {project.data?.testCases.map((testCase) => (
        <List.Item key={testCase.id}>
          <Anchor
            component={Link}
            underline="never"
            to={`/project/${project.data?.id}/testCase/${testCase.id}`}
          >
            <Flex gap={10} key={testCase.id} align={"center"}>
              <StatusMenu
                id={testCase.id}
                target={
                  <Button p={0} variant="transparent">
                    <StatusIcon status={testCase.status} />
                  </Button>
                }
                updateStatus={project.updateTestCaseStatus}
              />
              <Text
                size="12px"
                c={activeCaseId === testCase.id ? "primary" : "black"}
                fw={activeCaseId === testCase.id ? "bold" : "normal"}
              >
                {testCase.title}
              </Text>
            </Flex>
          </Anchor>
          <List listStyleType="none">
            {testCase.tests.map((test, index, arr) => (
              <List.Item key={test.id} style={{ marginBottom: -8 }}>
                <Anchor
                  component={Link}
                  underline="never"
                  to={`/project/${project.data.id}/testCase/${testCase.id}/test/${test.id}`}
                >
                  <Flex gap={3} key={test.id} align={"center"}>
                    <Trail isLast={arr.length === index + 1} />
                    <StatusMenu
                      id={test.id}
                      target={
                        <Button p={0} variant="transparent">
                          <StatusIcon status={test.status} />
                        </Button>
                      }
                      updateStatus={() => console.log("TODO")}
                    />
                    <Text
                      ml={7}
                      size="12px"
                      c={activeTestId === test.id ? "primary" : "black"}
                      fw={activeTestId === test.id ? "bold" : "normal"}
                    >
                      {test.title}
                    </Text>
                  </Flex>
                </Anchor>
              </List.Item>
            ))}
          </List>
        </List.Item>
      ))}
    </List>
  );
};
