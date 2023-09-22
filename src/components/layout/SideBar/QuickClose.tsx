import { ThemeIcon, UnstyledButton } from "@mantine/core";
import { MdClose } from "react-icons/md";
import { SIDEBAR_STATUS } from "./const";
import { useQuickCloseStyles } from "./styles";
import { WithNavbarStatus } from "./SideBar";

export const QuickClose: React.FC<WithNavbarStatus> = ({ status, toggle }) => {
  const { classes } = useQuickCloseStyles();

  if (status === SIDEBAR_STATUS.COLLAPSED) {
    return null;
  }

  return (
    <UnstyledButton
      onClick={() => toggle(SIDEBAR_STATUS.COLLAPSED)}
      className={classes.navbar_toogle}
      title="Collapse sidebar"
    >
      <ThemeIcon
        radius="xl"
        color="white"
        variant="default"
        className={classes.navbar_toogle_inner}
      >
        <MdClose />
      </ThemeIcon>
    </UnstyledButton>
  );
};
