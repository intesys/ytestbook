import { MdClose } from "react-icons/md";
import { ThemeIcon, UnstyledButton } from "@mantine/core";
import { SIDEBAR_STATUS } from "./const";
import { WithNavbarStatus } from "./SideBar";
import classes from "./quickClose.module.css";

export const QuickClose = ({ status, toggle }: WithNavbarStatus) =>
  status === SIDEBAR_STATUS.COLLAPSED ? null : (
    <UnstyledButton
      onClick={() => toggle(SIDEBAR_STATUS.COLLAPSED)}
      className={classes.navbarToogle}
      title="Collapse sidebar"
    >
      <ThemeIcon
        radius="xl"
        color="white"
        variant="default"
        className={classes.navbarToogleInner}
      >
        <MdClose />
      </ThemeIcon>
    </UnstyledButton>
  );
