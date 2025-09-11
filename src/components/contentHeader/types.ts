import { StatusEnum, TCollaborator } from "../../types/schema";

export type TContentHeader = {
  status: StatusEnum;
  title: string;
  jiraLink?: string;
  tags?: string[];
  assignees?: TCollaborator[];
  completion?: number;
  handleQuickEdit: (value: string) => void;
  handleEditClick?: () => void;
  handleDeleteClick: () => void;
  handleCloneClick?: () => void;
};

export type TJiraTagsColumns = {
  jiraLink?: string;
  tags?: string[];
};
