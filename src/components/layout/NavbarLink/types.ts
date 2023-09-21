import { StatusEnum } from "../../../generated";
import { NAVBAR_STATUS } from "../Navbar/const";

export interface IOwnProps {
  id?: string;
  title?: string;
  status?: StatusEnum;
  active?: boolean;
  navStatus?: NAVBAR_STATUS;
  onClick?: (id: string) => void;
}
