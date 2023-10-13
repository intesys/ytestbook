import { ThemeIcon, UnstyledButton } from "@mantine/core";
import { MdClose } from "react-icons/md";
import { SIDEBAR_STATUS } from "./const";
import { WithNavbarStatus } from "./SideBar";
import classes from "./quickClose.module.scss";

export const QuickClose: React.FC<WithNavbarStatus> = ({ status, toggle }) => {
  if (status === SIDEBAR_STATUS.COLLAPSED) {
    return null;
  }

  return (
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
};
