import { StatusEnum, TCollaborator } from "../../schema";

export type TContentHeader = {
  id: string;
  status: StatusEnum;
  title: string;
  jiraLink?: string;
  tags?: string[];
  assignees?: TCollaborator[];
  completion: number;
  handleUpdateStatus: (id: string, status: StatusEnum) => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};
