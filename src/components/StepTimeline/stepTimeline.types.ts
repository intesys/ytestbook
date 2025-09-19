import { TablerIcon } from "@tabler/icons-react";
import { ReactNode } from "react";
import { TComment, TStatusChange } from "../../types/schema.ts";

export enum ActivityType {
  Comment = "comments",
  StatusUpdate = "statusUpdates",
  UnsolvedComment = "comment",
}

export interface Activity {
  label: string;
  value: ActivityType;
  icon: TablerIcon;
}

export type SortOrder = "asc" | "desc";

export type StepTimelineItem = StepTimelineComment | StepTimelineStatusUpdate;

type StepTimelineBase = {
  icon?: ReactNode;
  date: number;
};

export type StepTimelineComment = StepTimelineBase & {
  type: ActivityType.Comment | ActivityType.UnsolvedComment;
  comment: TComment;
};

export type StepTimelineStatusUpdate = StepTimelineBase & {
  type: ActivityType.StatusUpdate;
  statusUpdate: TStatusChange;
};
