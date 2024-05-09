import { StatusEnum, TCollaborator } from "../../schema";

export type TContentHeader = {
  status: StatusEnum;
  title: string;
  jiraLink?: string;
  tags?: string[];
  assignees?: TCollaborator[];
  completion: number;
  handleQuickEdit: (value: string) => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};
