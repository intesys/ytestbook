import { Anchor, Text } from "@mantine/core";
import { useStep } from "../../lib/operators/useStep";
import { useTest } from "../../lib/operators/useTest";
import { useTestCase } from "../../lib/operators/useTestCase";
import { routesHelper } from "../../lib/helpers/routesHelper";
import { TComment } from "../../schema";
import { Link } from "react-router-dom";

type CommentBreadcrumbsProps = {
  readonly projectId: string;
  readonly comment: TComment;
};

export function CommentBreadcrumbs({
  projectId,
  comment,
}: CommentBreadcrumbsProps) {
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
    <Text size="sm">
      {testCase.data ? (
        <Anchor
          component={Link}
          to={routesHelper.testCaseDetail(projectId, comment.caseId)}
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
