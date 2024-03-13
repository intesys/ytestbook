import {
  Stack,
  Flex,
  Avatar,
  Button,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { parseTimestamp } from "../../lib/date/parseTimestamp";
import { TUseTestCase } from "../../lib/operators/useTestCase";
import { TComment, TCommentDynamicData } from "../../schema";
import StatusPending from "../../assets/icons/status_pending.svg";
import CheckCircle from "../../assets/icons/check_circle.svg";
import Delete from "../../assets/icons/delete.svg";
import { useForm } from "@mantine/form";

export function CommentsList({
  projectId,
  caseId,
  comments,
  createComment,
  removeComment,
}: {
  projectId: string | undefined;
  caseId: string | undefined;
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
      <Text fw={700} size="20px">
        Comments
      </Text>
      <form
        onSubmit={form.onSubmit((values) => {
          createComment(values);
          form.reset();
        })}
      >
        <Flex direction="column" gap={16}>
          <TextInput
            withAsterisk
            label="Username"
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
        <Text>Empty</Text>
      ) : (
        <Stack gap={10} mt={40}>
          {comments.map((comment) => (
            <Flex key={comment.id} gap={10}>
              <Avatar
                src={null}
                alt="Vitaly Rtishchev"
                color="red"
                h={40}
                w={40}
              >
                {comment.username[0]}
              </Avatar>
              <Flex direction={"column"} gap={12} px={10} py={5}>
                <Flex gap={17} align="center">
                  <Text fw={700}>@{comment.username}</Text>
                  <Text size="14px">{parseTimestamp(comment.createdAt)}</Text>
                  {comment.testStatusWhenCreated && (
                    <Flex gap={6}>
                      <Text>Test status when added: </Text>
                      <img src={StatusPending} height={24} width={24} />
                    </Flex>
                  )}
                  <Button variant="transparent" p={0}>
                    <img src={CheckCircle} height={24} width={24} />
                  </Button>
                  <Button
                    variant="transparent"
                    p={0}
                    onClick={() => removeComment(projectId, caseId, comment.id)}
                  >
                    <img src={Delete} height={24} width={24} />
                  </Button>
                </Flex>
                <Text>{comment.content}</Text>
              </Flex>
            </Flex>
          ))}
        </Stack>
      )}
    </>
  );
}
