import {
  Navbar as MuiNavbar,
  Stack,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import classnames from "classnames";
import React, { useState } from "react";
import {
  MdCloseFullscreen,
  MdOpenInFull,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";
import Button from "../../ui/Button/Button";
import { NavbarLink } from "../NavbarLink/NavbarLink";
import { NAVBAR_STATUS, navbarConfig } from "./const";
import useStyles from "./styles";

export const Navbar: React.FC = () => {
  const { classes } = useStyles();
  const [navbarStatus, setNavbarStatus] = useState<NAVBAR_STATUS>(
    NAVBAR_STATUS.COLLAPSED,
  );

  // handles active test
  const [active, setActive] = useState(0);

  const handleNavbarStatus = () => {
    if (navbarStatus === NAVBAR_STATUS.COLLAPSED) {
      // send("FULL");
    } else if (navbarStatus === NAVBAR_STATUS.FULLSCREEN) {
      // send("PREV");
    } else {
      // send("NEXT");
    }
  };

  const handleNavCollapsed = () => {
    if (navbarStatus === NAVBAR_STATUS.FULLSCREEN) {
      // send("RESET");
    } else if (navbarStatus === NAVBAR_STATUS.COLLAPSED) {
      // send("NEXT");
    } else {
      // send("PREV");
    }
  };

  const handleClickLink = (id: string, index: number) => {
    // const testcase = useTestcase(id, testcasesData);
    // testcase && setTestcase(testcase);
    setActive(index);
  };

  const links = <NavbarLink />;
  // testcasesData &&
  // testcasesStatus === LOADING_STATUS.SUCCESS &&
  // testcasesData.map((item, index) => (
  //   <NavbarLink
  //     {...item}
  //     key={item.title}
  //     navStatus={state.value as NAVBAR_STATUS}
  //     active={index === active}
  //     onClick={(id) => handleClickLink(id, index)}
  //   />
  // ));

  return (
    <MuiNavbar
      width={{
        base: navbarStatus
          ? navbarConfig[navbarStatus as NAVBAR_STATUS]
          : navbarConfig[NAVBAR_STATUS.OPEN],
      }}
      className={classes.navbar}
    >
      <MuiNavbar.Section className={classes.navbar_header}>
        <>
          <Button
            fullWidth
            className={classnames(classes.navbar_overview_toogle, navbarStatus)}
            leftIcon={<SvgIcon iconName="eye" />}
            onClick={handleNavbarStatus}
          >
            {navbarStatus !== NAVBAR_STATUS.COLLAPSED ? (
              <div className={classes.navbar_overview_toogle_content}>
                <span>OVERVIEW</span>
                {navbarStatus !== NAVBAR_STATUS.FULLSCREEN ? (
                  <MdSkipNext size={"1.5rem"} />
                ) : (
                  <MdSkipPrevious size={"1.5rem"} />
                )}
              </div>
            ) : (
              <></>
            )}
          </Button>
          <UnstyledButton
            onClick={handleNavCollapsed}
            className={classes.navbar_toogle}
          >
            <ThemeIcon
              radius="xl"
              color="white"
              variant="default"
              className={classes.navbar_toogle_inner}
            >
              {navbarStatus === NAVBAR_STATUS.COLLAPSED ? (
                <MdOpenInFull />
              ) : (
                <MdCloseFullscreen />
              )}
            </ThemeIcon>
          </UnstyledButton>
        </>
      </MuiNavbar.Section>
      <MuiNavbar.Section grow mt={40}>
        <Stack justify="center" spacing={0}>
          {navbarStatus !== NAVBAR_STATUS.FULLSCREEN ? (
            links
          ) : (
            <>Testcase data</>
            // <Overview data={testcasesData} />
          )}
        </Stack>
      </MuiNavbar.Section>
    </MuiNavbar>
  );
};
