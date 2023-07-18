import { NAVBAR_STATUS_ENUM } from "../Navbar/const";

export interface IOwnProps {
  id?: string;
  title?: string;
  status?: string;
  active?: boolean;
  navStatus?: NAVBAR_STATUS_ENUM;
  onClick?: (id: string) => void;
}
