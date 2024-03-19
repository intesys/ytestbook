import { StatusEnum } from "../../schema";

export type TContentHeader = {
  id: string;
  status: StatusEnum;
  title: string;
  jiraLink?: string;
  completion: number;
  handleUpdateStatus: (id: string, status: StatusEnum) => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};
