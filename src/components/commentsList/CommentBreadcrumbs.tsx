import { Anchor, Text } from "@mantine/core";
import { useStep } from "../../lib/operators/useStep";
import { useTest } from "../../lib/operators/useTest";
import { useTestCase } from "../../lib/operators/useTestCase";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { TComment } from "../../types/schema";
import { Link } from "react-router-dom";
import { useServerName } from "../../lib/helpers/useServerName";
import classes from "./CommentsList.module.css";

type CommentBreadcrumbsProps = {
  readonly projectId: string;
  readonly comment: TComment;
};

export function CommentBreadcrumbs({
  projectId,
  comment,
}: CommentBreadcrumbsProps) {
  const serverName = useServerName();
  const testCase = useTestCase(projectId, comment.caseId);
  const test = useTest(projectId, comment.caseId, comment.testId);
  const step = useStep(
    projectId,
    comment.caseId,
    comment.testId,
    comment.stepId,
  );

  const separator = " > ";

  return (
    <Text size="sm" className={classes.fadedElement}>
      {testCase.data ? (
        <Anchor
          component={Link}
          to={routesHelper.testCaseDetail(
            serverName,
            projectId,
            comment.caseId,
          )}
        >
          {testCase.data?.title}
        </Anchor>
      ) : null}

      {test.data ? (
        <>
          {separator}
          <Anchor
            component={Link}
            to={routesHelper.testDetail(
              serverName,
              projectId,
              comment.caseId,
              test.data.id,
            )}
          >
            {test.data?.title}
          </Anchor>
        </>
      ) : null}

      {test.data && step.data ? (
        <>
          {separator}
          <Anchor
            component={Link}
            to={routesHelper.stepDetail(
              serverName,
              projectId,
              comment.caseId,
              test.data.id,
              step.data.id,
            )}
          >
            {step.data?.title}
          </Anchor>
        </>
      ) : null}
    </Text>
  );
}
