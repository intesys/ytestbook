import {
  Avatar,
  Button,
  Flex,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { parseTimestamp } from "../../lib/date/parseTimestamp";

import { useForm } from "@mantine/form";
import CheckCircle from "../../assets/icons/check_circle.svg";
import Delete from "../../assets/icons/delete.svg";
import StatusPending from "../../assets/icons/status_pending.svg";
import { TUseTestCase } from "../../lib/operators/types";
import { TComment, TCommentDynamicData } from "../../schema";

export function CommentsList({
  testId,
  comments,
  createComment,
  removeComment,
}: {
  testId?: string;
  comments: TComment[];
  createComment: TUseTestCase["createComment"];
  removeComment: TUseTestCase["removeComment"];
}) {
  const form = useForm<TCommentDynamicData>({
    initialValues: {
      username: "",
      content: "",
    },
  });
  return (
    <>
      <Title order={4}>Comments</Title>
      <form
        onSubmit={form.onSubmit((values) => {
          createComment(values, testId);
          form.reset();
        })}
      >
        <Flex direction="column" gap={16}>
          <TextInput
            withAsterisk
            label="Name"
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
              <Avatar
                src={null}
                alt={comment.username}
                color="red"
                h={40}
                w={40}
              >
                {comment.username[0]}
              </Avatar>
              <Flex direction={"column"} gap={12} px={10} py={5}>
                <Flex gap={17} align="center">
                  <Text fw={700}>@{comment.username}</Text>
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
