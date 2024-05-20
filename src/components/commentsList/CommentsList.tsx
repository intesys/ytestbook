import {
  Avatar,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { parseTimestamp } from "../../lib/date/parseTimestamp";

import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom";
import CheckCircle from "../../assets/icons/check_circle.svg";
import Delete from "../../assets/icons/delete.svg";
import StatusPending from "../../assets/icons/status_pending.svg";
import { TUseTestCase } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject";
import { TComment, TCommentDynamicData } from "../../schema";
import { useMemo } from "react";

export function CommentsList({
  testId,
  stepId,
  comments,
  createComment,
  removeComment,
}: {
  testId?: string;
  stepId?: string;
  comments: TComment[];
  createComment: TUseTestCase["createComment"];
  removeComment: TUseTestCase["removeComment"];
}) {
  const params = useParams();
  const project = useProject(params.projectId);
  const form = useForm<TCommentDynamicData>({
    initialValues: {
      username: "",
      content: "",
    },
  });

  const nameOptions = useMemo(() => {
    if (project.data?.collaborators) {
      const options = project.data.collaborators.map(
        (collaborator) => collaborator.name,
      );
      options.push("Anonymous");
      return options;
    }
  }, [project.data?.collaborators]);

  return (
    <>
      <Title order={4}>Comments</Title>
      <form
        onSubmit={form.onSubmit((values) => {
          createComment(values, testId, stepId);
          form.reset();
        })}
      >
        <Flex direction="column" gap={16}>
          <Select
            withAsterisk
            label="Member"
            data={nameOptions}
            {...form.getInputProps("username")}
          />
          <Textarea
            placeholder="Your comment here"
            rows={6}
            {...form.getInputProps("content")}
          />
        </Flex>
        <Flex justify="end" mt={16}>
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
      {comments.length === 0 ? (
        <Text ta={"center"}>There are still no comments here</Text>
      ) : (
        <Stack gap={10} mt={40}>
          {comments.map((comment) => (
            <Flex key={comment.id} gap={10}>
              <Avatar alt={comment.username}>
                {comment.username.split(" ")[0]?.[0]}
                {comment.username.split(" ")[1]?.[0]}
              </Avatar>
              <Flex direction={"column"} gap={12} px={10} py={5}>
                <Flex gap={17} align="center">
                  <Text fw={700}>{comment.username}</Text>
                  <Text size="sm">{parseTimestamp(comment.createdAt)}</Text>
                  {comment.testStatusWhenCreated && (
                    <Flex gap={6}>
                      <Text size="sm">Test status when added: </Text>
                      <img src={StatusPending} height={24} width={24} />
                    </Flex>
                  )}
                  <Button variant="transparent" p={0}>
                    <img src={CheckCircle} height={24} width={24} />
                  </Button>
                  <Button
                    variant="transparent"
                    p={0}
                    onClick={() => removeComment(comment.id)}
                  >
                    <img src={Delete} height={24} width={24} />
                  </Button>
                </Flex>
                <Text size="sm">
                  {comment.caseId}{" "}
                  {comment.testId ? " > " + comment.testId : ""}
                </Text>
                <Text>{comment.content}</Text>
              </Flex>
            </Flex>
          ))}
        </Stack>
      )}
    </>
  );
}
