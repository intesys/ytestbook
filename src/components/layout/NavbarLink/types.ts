import { StatusEnum } from "../../../generated";
import { NAVBAR_STATUS_ENUM } from "../Navbar/const";

export interface IOwnProps {
  id?: string;
  title?: string;
  status?: StatusEnum;
  active?: boolean;
  navStatus?: NAVBAR_STATUS_ENUM;
  onClick?: (id: string) => void;
}
