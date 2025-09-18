import { Card, CardProps, Stack, Text } from "@mantine/core";
import { NewCommentForm } from "@/components/commentsList/NewCommentForm.tsx";
import { TUseProject, TUseTestCase } from "@/lib/operators/types.ts";

interface StepTimelineNewCommentCardProps extends CardProps {
  testId?: string;
  stepId?: string;
  project: TUseProject;
  createComment: TUseTestCase["createComment"];
}

export const StepTimelineNewCommentCard = ({
  testId,
  stepId,
  project,
  createComment,
  ...cardProps
}: StepTimelineNewCommentCardProps) => {
  return (
    <Card {...cardProps}>
      <Stack gap="sm">
        <Text size="lg">Add a new Comment</Text>
        <NewCommentForm
          createComment={createComment}
          project={project}
          stepId={stepId}
          testId={testId}
        />
      </Stack>
    </Card>
  );
};
