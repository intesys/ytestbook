import {
  Button,
  Card,
  CardProps,
  Group,
  Image,
  Indicator,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import clsx from "clsx";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import CheckCircle from "../../../assets/icons/check_circle.svg";
import CheckCircleFull from "../../../assets/icons/check_circle_full.svg";
import Delete from "../../../assets/icons/delete.svg";
import { USER_ANONYMOUS } from "../../../lib/constants/generic.ts";
import { getStatusColor } from "../../../lib/helpers/getStatusColor.ts";
import { getStatusIcon } from "../../../lib/helpers/getStatusIcon.ts";
import { getStatusLabel } from "../../../lib/helpers/getStatusLabel.ts";
import { TUseTestCase } from "../../../lib/operators/types.ts";
import { useProject } from "../../../lib/operators/useProject.ts";
import { StatusEnum } from "../../../types/schema.ts";
import { CollaboratorAvatar } from "../../CollaboratorAvatar/CollaboratorAvatar.tsx";
import { CommentBreadcrumbs } from "../../commentsList/CommentBreadcrumbs.tsx";

import { openDeleteConfirmModal } from "../../modals/modals.ts";
import { EditableHtmlText } from "../../shared/EditableHtmlText.tsx";
import { RelativeDate } from "../../shared/relativeDate/RelativeDate.tsx";
import { StepTimelineComment } from "../stepTimeline.types.ts";
import classes from "./StepTimelineCommentCard.module.css";

interface StepTimelineCommentCardProps extends CardProps {
  item: StepTimelineComment;
  removeComment: TUseTestCase["removeComment"];
  updateCommentContent: TUseTestCase["updateCommentContent"];
  updateCommentResolved: TUseTestCase["updateCommentResolved"];
}

export const StepTimelineCommentCard = ({
  className,
  item,
  removeComment,
  updateCommentContent,
  updateCommentResolved,
  ...cardProps
}: StepTimelineCommentCardProps) => {
  const params = useParams();
  const project = useProject(params.projectId);

  const collaborator = item?.comment?.collaboratorId
    ? project.getCollaborator(item?.comment?.collaboratorId)
    : undefined;

  const toggleIsResolved = useCallback(() => {
    updateCommentResolved(!item?.comment?.resolved, item?.comment.id);
  }, [item?.comment.id, item?.comment?.resolved, updateCommentResolved]);

  const updateContent = useCallback(
    (content: string) => {
      updateCommentContent(content, item?.comment.id);
    },
    [item?.comment.id, updateCommentContent],
  );

  const updateContentHandler = useCallback(
    (content: string) => updateContent(content),
    [updateContent],
  );

  const deleteCommentHandler = useCallback(() => {
    openDeleteConfirmModal("Are you sure you want to delete this comment?", {
      handleConfirm: () => removeComment(item?.comment.id),
    });
  }, [item?.comment.id, removeComment]);

  const StatusIcon = getStatusIcon(
    item?.comment?.testStatusWhenCreated ?? StatusEnum.TODO,
  );

  return (
    <Card
      radius="md"
      className={clsx(classes.comment, className, {
        [classes.commentSolved]: item?.comment?.resolved,
      })}
      {...cardProps}
    >
      <Stack>
        {/* Heading with Avatar, collaborator name and Mark/Delete buttons*/}
        <Group align="center" justify="space-between">
          <Group>
            <Indicator
              offset={3}
              position="bottom-end"
              color="white"
              label={
                <Tooltip
                  label={`Status when added: ${getStatusLabel(item?.comment?.testStatusWhenCreated)}`}
                  withArrow
                  events={{ hover: true, focus: false, touch: true }}
                >
                  <ThemeIcon
                    color={getStatusColor(item?.comment?.testStatusWhenCreated)}
                    variant="white"
                    radius="xl"
                  >
                    <StatusIcon size="1.6rem" />
                  </ThemeIcon>
                </Tooltip>
              }
              styles={{
                indicator: { padding: 0 },
              }}
            >
              <CollaboratorAvatar collaborator={collaborator} />
            </Indicator>
            <Stack gap={4}>
              <Text span inline fw="bold">
                {collaborator?.name ?? USER_ANONYMOUS.name}
              </Text>
              <Text span inline c="dimmed" size="sm">
                <RelativeDate timeStamp={item?.comment?.createdAt} />
              </Text>
            </Stack>
          </Group>
          <Group gap={6} wrap="nowrap">
            <Button variant="transparent" p={0} onClick={toggleIsResolved}>
              <Tooltip
                label={
                  item?.comment?.resolved
                    ? "Unmark as Resolved"
                    : "Mark as Resolved"
                }
              >
                <Image
                  alt={item?.comment?.resolved ? "Resolved" : "To resolve"}
                  src={item?.comment?.resolved ? CheckCircleFull : CheckCircle}
                  h={24}
                  w={24}
                />
              </Tooltip>
            </Button>
            <Button variant="transparent" p={0} onClick={deleteCommentHandler}>
              <Tooltip label="Delete comment">
                <Image alt="Delete" src={Delete} h={24} w={24} />
              </Tooltip>
            </Button>
          </Group>
        </Group>

        {/* Comment breadcrumbs and content */}
        <Stack gap={6}>
          <CommentBreadcrumbs
            className={classes.fadedElement}
            projectId={project.data?.id ?? ""}
            comment={item.comment}
          />
          <EditableHtmlText
            name="comment"
            textProps={{
              className: classes.fadedElement,
            }}
            value={item?.comment?.content}
            onChange={updateContentHandler}
          />
        </Stack>
      </Stack>
    </Card>
  );
};
