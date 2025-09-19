import { CardProps, rem, Stack, ThemeIcon, Timeline } from "@mantine/core";
import { IconCactus, IconMessagePlus, IconProps } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { TUseProject, TUseTestCase } from "../../lib/operators/types.ts";
import { StepTimelineCommentCard } from "./cards/StepTimelineCommentCard.tsx";
import { StepTimelineEmptyCard } from "./cards/StepTimelineEmptyCard.tsx";
import { StepTimelineNewCommentCard } from "./cards/StepTimelineNewCommentCard.tsx";
import { StepTimelineStatusUpdateCard } from "./cards/StepTimelineStatusUpdateCard.tsx";
import {
  ActivityType,
  SortOrder,
  StepTimelineItem,
} from "./stepTimeline.types.ts";
import { ACTIVITIES } from "./stepTimeline.utils.ts";
import { StepTimelineFilters } from "./StepTimelineFilters/StepTimelineFilters.tsx";

interface StepTimelineProps {
  list: Array<StepTimelineItem>;
  testId?: string;
  stepId?: string;
  project: TUseProject;
  createComment: TUseTestCase["createComment"];
  removeComment: TUseTestCase["removeComment"];
  updateCommentResolved: TUseTestCase["updateCommentResolved"];
  updateCommentContent: TUseTestCase["updateCommentContent"];
}

const commonIconProps: IconProps = { size: rem(18) };

export const StepTimeline = ({
  list = [],
  testId,
  stepId,
  project,
  createComment,
  removeComment,
  updateCommentResolved,
  updateCommentContent,
}: StepTimelineProps) => {
  const [filteredActivities, setFilteredActivities] = useState<ActivityType[]>(
    ACTIVITIES.map((a) => a.value),
  );
  const [sort, setSort] = useState<SortOrder>("asc");

  // Filter and sort the list based on user selections
  const filteredList = useMemo(
    () =>
      list
        .filter((item) => filteredActivities.includes(item.type))
        .sort((a, b) => {
          if (sort === "asc") {
            return a.date - b.date;
          }

          return b.date - a.date;
        }),
    [filteredActivities, list, sort],
  );

  // Keep common card props in one place for easier adjustments
  // and to ensure consistency across different card types
  const commonCardProps: CardProps = {
    p: "sm",
  };

  // Determine if comments are visible based on current filters
  // This helps to decide whether to show the "new comment" card or not
  // As there is no point in showing it if comments are filtered out.
  const commentsVisible = useMemo(
    () =>
      filteredActivities.includes(ActivityType.Comment) ||
      filteredActivities.includes(ActivityType.UnsolvedComment),
    [filteredActivities],
  );

  const newCommentItem = commentsVisible ? (
    <Timeline.Item
      lineVariant="dashed"
      bullet={<IconMessagePlus size={rem(18)} />}
    >
      <StepTimelineNewCommentCard
        createComment={createComment}
        testId={testId}
        stepId={stepId}
        project={project}
      />
    </Timeline.Item>
  ) : null;

  return (
    <Stack>
      <StepTimelineFilters
        filteredActivities={filteredActivities}
        setFilteredActivities={setFilteredActivities}
        setSort={setSort}
        sort={sort}
      />
      <Timeline
        active={
          filteredList.length === 0
            ? -1
            : filteredList.length - (commentsVisible ? 1 : 0)
        }
        reverseActive={sort === "desc"}
        bulletSize={25}
        lineWidth={2}
      >
        {filteredList.length === 0 ? (
          <Timeline.Item
            lineVariant="dashed"
            bullet={<IconCactus size={rem(18)} />}
          >
            <StepTimelineEmptyCard
              filteredActivities={filteredActivities}
              setFilteredActivities={setFilteredActivities}
              {...commonCardProps}
            />
          </Timeline.Item>
        ) : null}

        {/* If sort is desc, the newest comments will be at the top, so we print the new comment card BEFORE the list*/}
        {sort === "desc" ? newCommentItem : null}

        {filteredList.map((item, index, innerList) => {
          const isLastItem = index === innerList.length - 1;

          const activity = ACTIVITIES.find((a) => a.value === item.type);
          const activityLabel = activity?.label ?? "";
          const ActivityIcon = activity?.icon ?? null;
          const activityBullet =
            ActivityIcon !== null ? (
              <ThemeIcon radius="xl" title={activityLabel}>
                <ActivityIcon {...commonIconProps} />
              </ThemeIcon>
            ) : null;

          const lineVariant = sort === "asc" && isLastItem ? "dashed" : "solid";

          return (
            <Timeline.Item
              key={index}
              lineVariant={lineVariant}
              bullet={activityBullet}
            >
              {item.type === ActivityType.StatusUpdate ? (
                <StepTimelineStatusUpdateCard
                  item={item}
                  {...commonCardProps}
                />
              ) : null}
              {item.type === ActivityType.Comment ||
              item.type === ActivityType.UnsolvedComment ? (
                <StepTimelineCommentCard
                  item={item}
                  removeComment={removeComment}
                  updateCommentContent={updateCommentContent}
                  updateCommentResolved={updateCommentResolved}
                  {...commonCardProps}
                />
              ) : null}
            </Timeline.Item>
          );
        })}

        {/* If sort is asc, the newest comments will be at the bottom, so we print the new comment card AFTER the list*/}
        {sort === "asc" ? newCommentItem : null}
      </Timeline>
    </Stack>
  );
};
