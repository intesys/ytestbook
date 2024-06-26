import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import CheckCircle from "../../assets/icons/check_circle.svg";
import CheckCircleFull from "../../assets/icons/check_circle_full.svg";
import Delete from "../../assets/icons/delete.svg";
import { TUseTestCase } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject";
import { TComment, TCommentDynamicData, TStep, TTest } from "../../schema";
import { openDeleteConfirmModal } from "../modals/modals.ts";
import { RelativeDate } from "../relativeDate/RelativeDate";
import { StatusIcon } from "../statusIcon/StatusIcon";
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
  showTitle?: boolean;
}>;

export function CommentsList({
  testId,
  stepId,
  comments,
  createComment,
  removeComment,
  updateCommentResolved,
  filter,
  showTitle = true,
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

  const toggleIsResolved = useCallback(
    (comment: TComment) => {
      updateCommentResolved(!comment.resolved, comment.id);
    },
    [updateCommentResolved],
  );

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

  // Sort comments
  const computedComments = useMemo(
    () => filteredComments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
    [filteredComments],
  );

  if (!project.data?.id) {
    return null;
  }

  return (
    <>
      {showTitle ? <Title order={4}>Notes</Title> : null}

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
            {computedComments.map((comment) => {
              const deleteCommentHandler = () =>
                openDeleteConfirmModal(
                  "Are you sure you want to delete this comment?",
                  {
                    handleConfirm: () => removeComment(comment.id),
                  },
                );

              return (
                <Flex key={comment.id} gap={10}>
                  <Avatar alt={comment.username}>
                    {comment.username.split(" ")[0]?.[0]}
                    {comment.username.split(" ")[1]?.[0]}
                  </Avatar>
                  <Flex
                    direction={"column"}
                    gap={12}
                    px={10}
                    py={5}
                    style={{ flexGrow: 1 }}
                  >
                    <Flex
                      gap={{ base: 5, md: 17 }}
                      align={{ base: "flex-start", md: "center" }}
                      justify="space-between"
                      direction={{
                        base: "column",
                        md: "row",
                      }}
                    >
                      <Text fw={700} miw={130}>
                        {comment.username}
                      </Text>
                      {comment.testStatusWhenCreated && (
                        <Flex gap={6} align="center">
                          <Text size="sm" fw={500}>
                            Test status when added:{" "}
                          </Text>

                          <StatusIcon status={comment.testStatusWhenCreated} />
                        </Flex>
                      )}

                      <Group gap={10}>
                        <Button
                          variant="transparent"
                          p={0}
                          onClick={() => toggleIsResolved(comment)}
                        >
                          <Tooltip
                            label={
                              comment.resolved
                                ? "Unmark as Resolved"
                                : "Mark as Resolved"
                            }
                          >
                            <Image
                              alt={comment.resolved ? "Resolved" : "To resolve"}
                              src={
                                comment.resolved ? CheckCircleFull : CheckCircle
                              }
                              h={24}
                              w={24}
                            />
                          </Tooltip>
                        </Button>
                        <Button
                          variant="transparent"
                          onClick={deleteCommentHandler}
                        >
                          <img
                            alt="Delete"
                            src={Delete}
                            height={24}
                            width={24}
                          />
                        </Button>
                      </Group>
                    </Flex>

                    <Text size="sm">
                      <RelativeDate timeStamp={comment.createdAt} />
                    </Text>

                    <CommentBreadcrumbs
                      projectId={project.data?.id}
                      comment={comment}
                    />
                    <Text>{comment.content}</Text>
                  </Flex>
                </Flex>
              );
            })}
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
