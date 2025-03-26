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
  Title,
  Tooltip,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import CheckCircle from "../../assets/icons/check_circle.svg";
import CheckCircleFull from "../../assets/icons/check_circle_full.svg";
import Delete from "../../assets/icons/delete.svg";
import { USER_ANONYMOUS } from "../../lib/constants/generic.ts";
import { TUseTestCase } from "../../lib/operators/types";
import { useProject } from "../../lib/operators/useProject";
import { TCollaborator, TComment, TStep, TTest } from "../../types/schema";
import { Avatars } from "../avatars/Avatars";
import { openDeleteConfirmModal } from "../modals/modals";
import { RelativeDate } from "../shared/relativeDate/RelativeDate.tsx";
import { StatusIconWithLabel } from "../statusIcon/StatusIconWithLabel.tsx";
import { CommentBreadcrumbs } from "./CommentBreadcrumbs";
import { NewCommentForm } from "./NewCommentForm.tsx";
import { TFilterForm } from "./types";
import classes from "./CommentsList.module.css";
import clsx from "clsx";

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

  const filterForm = useForm<TFilterForm>({
    initialValues: {
      test: "all",
      showSolved: true,
    },
  });

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
    () =>
      filteredComments.toSorted((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
    [filteredComments],
  );

  if (!project.data?.id) {
    return null;
  }

  const collaboratorAvatar = (collaborator?: TCollaborator) => {
    if (collaborator) {
      return <Avatars collaborators={[collaborator]} maxAvatars={1} />;
    }

    return (
      <Avatar alt={USER_ANONYMOUS.name}>
        {USER_ANONYMOUS.name.substring(0, 1)}
      </Avatar>
    );
  };

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
              const collaborator = project.getCollaborator(
                comment.collaboratorId,
              );

              const deleteCommentHandler = () =>
                openDeleteConfirmModal(
                  "Are you sure you want to delete this comment?",
                  {
                    handleConfirm: () => removeComment(comment.id),
                  },
                );

              return (
                <Flex
                  key={comment.id}
                  gap={10}
                  className={clsx({
                    [classes.comment]: true,
                    [classes.commentSolved]: comment.resolved,
                  })}
                >
                  {collaboratorAvatar(collaborator)}
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
                      <Text fw={700} miw={130} className={classes.fadedElement}>
                        {collaborator?.name ?? USER_ANONYMOUS.name}
                      </Text>
                      {comment.testStatusWhenCreated && (
                        <Flex
                          gap={6}
                          align="center"
                          style={{ flexBasis: 300 }}
                          className={classes.fadedElement}
                        >
                          <Text size="sm" fw={500}>
                            Status when added:{" "}
                          </Text>

                          <StatusIconWithLabel
                            status={comment.testStatusWhenCreated}
                            style={{ flexBasis: 150 }}
                          />
                        </Flex>
                      )}

                      <Group gap={6} wrap="nowrap">
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
                          p={0}
                          onClick={deleteCommentHandler}
                        >
                          <Tooltip label={"Delete comment"}>
                            <Image alt="Delete" src={Delete} h={24} w={24} />
                          </Tooltip>
                        </Button>
                      </Group>
                    </Flex>

                    <Text size="sm" className={classes.fadedElement}>
                      <RelativeDate timeStamp={comment.createdAt} />
                    </Text>

                    <CommentBreadcrumbs
                      projectId={project.data?.id}
                      comment={comment}
                    />
                    <Text
                      className={classes.fadedElement}
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                  </Flex>
                </Flex>
              );
            })}
          </Stack>
        </Stack>
      )}

      <NewCommentForm
        createComment={createComment}
        project={project}
        stepId={stepId}
        testId={testId}
      />
    </>
  );
}
