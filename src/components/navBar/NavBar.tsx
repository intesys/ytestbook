import { Anchor, Button, Flex, List, ThemeIcon, Text } from "@mantine/core";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuPanelLeftOpen } from "react-icons/lu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { StatusMenu } from "../statusMenu/StatusMenu";
import { Trail } from "../trail/Trail";
import classes from "./navBar.module.scss";
import { useProject } from "../../lib/operators/useProject";

export function NavBar() {
  const params = useParams();
  const project = useProject(params.projectId);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeCaseId, setActiveCaseId] = useState("");
  const [activeTestId, setActiveTestId] = useState("");
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  useEffect(() => {
    /**If there's no caseId defined in the URL, it sets the first testCase as the active one  */
    if (pathname.includes("/settings")) return;
    if (!params.caseId && project.data && project.data?.testCases.length > 0) {
      const caseId = project.data.testCases[0].id;
      setActiveCaseId(caseId);
      navigate(`/project/${project.data.id}/testCase/${caseId}`);
    }
  }, [params, project.data, activeCaseId, pathname]);

  useEffect(() => {
    if (params.caseId) {
      setActiveCaseId(params.caseId);
    }

    if (params.testId) {
      setActiveTestId(params.testId);
    } else {
      setActiveTestId("");
    }
  }, [params]);

  return (
    <Flex
      className={classnames(classes.sideBar, {
        [classes.open]: !sideBarCollapsed,
      })}
      direction={"column"}
      bg={"#EBEEFB"}
    >
      <Button
        className={classes.visibilitySwitch}
        bg={"white"}
        h={24}
        w={24}
        p={0}
        mr={-12}
        radius={12}
        mt={37}
        style={{ alignSelf: "flex-end" }}
        onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
      >
        <ThemeIcon c={"black"} variant="transparent" size={18}>
          {sideBarCollapsed ? <LuPanelLeftOpen /> : <IoMdClose />}
        </ThemeIcon>
      </Button>
      <List
        className={classnames(classes.navList, {
          [classes.hidden]: sideBarCollapsed,
        })}
        miw={300}
        px={20}
        py={30}
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
    </Flex>
  );
}
