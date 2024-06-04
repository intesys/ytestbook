import {
  Avatar,
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  Title,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import CheckCircle from "../../assets/icons/check_circle.svg";
import CheckCircleFull from "../../assets/icons/check_circle_full.svg";
import Delete from "../../assets/icons/delete.svg";
import StatusPending from "../../assets/icons/status_pending.svg";
import { TUseTestCase } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject";
import { TComment, TCommentDynamicData, TStep, TTest } from "../../schema";
import { RelativeDate } from "../relativeDate/RelativeDate";
import { CommentBreadcrumbs } from "./CommentBreadcrumbs";
import { TFilterForm } from "./types";

type CommentsListProps = Readonly<{
  testId?: string;
  stepId?: string;
  comments: TComment[];
  createComment: TUseTestCase["createComment"];
  removeComment: TUseTestCase["removeComment"];
  updateCommentResolved: TUseTestCase["updateCommentResolved"];
  filter?: {
    type: "test" | "step";
    elements: (TTest | TStep)[];
  };
}>;

export function CommentsList({
  testId,
  stepId,
  comments,
  createComment,
  removeComment,
  updateCommentResolved,
  filter,
}: CommentsListProps) {
  const params = useParams();
  const project = useProject(params.projectId);

  const form = useForm<TCommentDynamicData>({
    initialValues: {
      username: "",
      content: "",
    },
  });

  const filterForm = useForm<TFilterForm>({
    initialValues: {
      test: "all",
      showSolved: true,
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

  const toggleIsResolved = (comment: TComment) => {
    updateCommentResolved(!comment.resolved, comment.id);
  };

  // Compute select type filter options
  const filterOptions = useMemo(() => {
    const options: Record<string, string> = {
      all: "All texts",
    };

    filter?.elements.forEach((e) => {
      if (!options[e.id]) {
        if ((e as TTest).title) {
          options[e.id] = (e as TTest).title;
        } else {
          options[e.id] = e.description ?? "";
        }
      }
    });

    return Object.entries(options).map((o) => ({
      label: o[1],
      value: o[0],
    }));
  }, [filter?.elements]);

  // Filter comments by selected filters
  const filteredComments = useMemo(() => {
    if (filterForm.values.test === "all" && filterForm.values.showSolved) {
      return comments;
    }

    return comments.filter((c) => {
      const filterProperty: keyof TComment =
        filter?.type === "test" ? "testId" : "stepId";
      if (
        filterForm.values.test &&
        filterForm.values.test !== "all" &&
        c[filterProperty] !== filterForm.values.test
      ) {
        return false;
      }

      if (!filterForm.values.showSolved && c.resolved) {
        return false;
      }

      return true;
    });
  }, [
    filterForm.values.test,
    filterForm.values.showSolved,
    comments,
    filter?.type,
  ]);

  if (!project.data?.id) {
    return null;
  }

  return (
    <>
      <Title order={4}>Notes</Title>

      {comments.length === 0 ? (
        <Text ta={"center"}>There are still no notes here</Text>
      ) : (
        <Stack>
          <form>
            <Flex justify="space-between" align="center">
              <Box>
                {filter ? (
                  <Select
                    label="Show:"
                    data={filterOptions}
                    name="test"
                    allowDeselect={false}
                    {...filterForm.getInputProps("test")}
                  />
                ) : null}
              </Box>
              <Box>
                <Switch
                  labelPosition="left"
                  label="Show solved:"
                  name="showSolved"
                  defaultChecked={true}
                  {...filterForm.getInputProps("showSolved")}
                />
              </Box>
            </Flex>
          </form>
          <Stack gap={10} mt={40}>
            {filteredComments.map((comment) => (
              <Flex key={comment.id} gap={10}>
                <Avatar alt={comment.username}>
                  {comment.username.split(" ")[0]?.[0]}
                  {comment.username.split(" ")[1]?.[0]}
                </Avatar>
                <Flex direction={"column"} gap={12} px={10} py={5}>
                  <Flex gap={17} align="center">
                    <Text fw={700}>{comment.username}</Text>
                    <Text size="sm">
                      <RelativeDate timeStamp={comment.createdAt} />
                    </Text>
                    {comment.testStatusWhenCreated && (
                      <Flex gap={6}>
                        <Text size="sm">Test status when added: </Text>
                        <img
                          alt={comment.testStatusWhenCreated}
                          src={StatusPending}
                          height={24}
                          width={24}
                        />
                      </Flex>
                    )}
                    <Button
                      variant="transparent"
                      p={0}
                      onClick={() => toggleIsResolved(comment)}
                    >
                      <img
                        alt={comment.resolved ? "Resolved" : "To resolve"}
                        src={comment.resolved ? CheckCircleFull : CheckCircle}
                        height={24}
                        width={24}
                      />
                    </Button>
                    <Button
                      variant="transparent"
                      p={0}
                      onClick={() => removeComment(comment.id)}
                    >
                      <img alt="Delete" src={Delete} height={24} width={24} />
                    </Button>
                  </Flex>
                  <CommentBreadcrumbs
                    projectId={project.data?.id}
                    comment={comment}
                  />
                  <Text>{comment.content}</Text>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Stack>
      )}

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
    </>
  );
}
