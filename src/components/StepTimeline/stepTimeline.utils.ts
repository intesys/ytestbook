import {
  IconMessage,
  IconMessageOff,
  IconProgressCheck,
} from "@tabler/icons-react";
import { Activity, ActivityType } from "./stepTimeline.types.ts";

export const ACTIVITIES: Activity[] = [
  {
    label: "Comment (unsolved)",
    value: ActivityType.UnsolvedComment,
    icon: IconMessage,
  },
  {
    label: "Comment (resolved)",
    value: ActivityType.Comment,
    icon: IconMessageOff,
  },
  {
    label: "Status Update",
    value: ActivityType.StatusUpdate,
    icon: IconProgressCheck,
  },
];
