import { Button, Flex, Loader, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import JiraIcon from "../../assets/icons/cib_jira.svg";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import StatusDone from "../../assets/icons/status_done.svg";
import { useProject } from "../../lib/operators/useProject";
import { useTestCase } from "../../lib/operators/useTestCase";
import { CommentsList } from "../commentsList/CommentsList";
import { TestsTable } from "../testsTable/TestsTable";
import classes from "./testCase.module.scss";

export function TestCase() {
  const params = useParams();
  const project = useProject(params.projectId);
  const testCase = useTestCase(params.projectId, params.caseId);

  if (testCase.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh">
        <Loader color="blue" size="lg" />
      </Flex>
    );
  } else {
    return (
      <div className={classes.testcase}>
        <div className={classes.header}>
          <div className={classes.headerTop}>
            <img src={StatusDone} height={24} width={24} />
            <Text size="24px" fw={"700"}>
              {testCase.data.title}
            </Text>
          </div>
          <div className={classes.headerBottom}>
            <div>
              <a href={testCase.data.jiraLink}>
                <img src={JiraIcon} height={20} width={20} /> Jira Link
              </a>
            </div>
            <div>
              <Button
                leftSection={<img src={Edit} height={24} width={24} />}
                variant="subtle"
                c={"black"}
                onClick={() => project.removeTestCase(testCase.data.id)}
              >
                Edit
              </Button>
              <Button
                leftSection={<img src={Delete} height={24} width={24} />}
                variant="subtle"
                c={"black"}
                onClick={() => project.removeTestCase(testCase.data.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className={classes.description}>
          <Text>{testCase.data.description}</Text>
        </div>

        <div className={classes.tests}>
          <TestsTable
            tests={testCase.data.tests}
            createTest={testCase.createTest}
          />
        </div>

        <div className={classes.comments}>
          <CommentsList
            projectId={params.projectId}
            caseId={params.caseId}
            comments={testCase.data.comments}
            createComment={testCase.createComment}
            removeComment={testCase.removeComment}
          />
        </div>
      </div>
    );
  }
}
