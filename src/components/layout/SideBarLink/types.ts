import { StatusEnum } from "../../../generated";
import { SIDEBAR_STATUS } from "../SideBar/const";

export interface IOwnProps {
  id?: string;
  title?: string;
  status?: StatusEnum;
  active?: boolean;
  navStatus?: SIDEBAR_STATUS;
  onClick?: (id: string) => void;
}
