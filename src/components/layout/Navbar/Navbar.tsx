import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import EyeIcon from "../../../assets/icons/eye.svg";
import { Navbar as MuiNavbar, Stack, ThemeIcon, UnstyledButton } from "@mantine/core";
import { NavbarLink } from "../NavbarLink/NavbarLink";
import Button from "../../ui/Button/Button";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import { LOADING_STATUS } from "../../../reducer/types";
import { MdCloseFullscreen, MdOpenInFull, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { navbarConfig, NAVBAR_STATUS_ENUM, toggleMachine } from "./const";
import { useMachine } from "@xstate/react";
import classnames from "classnames";

const Navbar: React.FC = () => {
  const { classes } = useStyles();
  const [active, setActive] = useState(0);
  const [state, send, service] = useMachine(toggleMachine);

  const {
    state: {
      testcases: { data: testcasesData, status: testcasesStatus },
    },
    getTestcases,
  } = useYTestbookContext();

  useEffect(() => {
    getTestcases();
  }, []);

  const handleNavbarStatus = () => {
    if (state.matches(NAVBAR_STATUS_ENUM.collapsed)) {
      send("FULL");
    } else if (state.matches(NAVBAR_STATUS_ENUM.full)) {
      send("PREV");
    } else {
      send("NEXT");
    }
  };

  const handlerNavCollapsed = () => {
    if (state.matches(NAVBAR_STATUS_ENUM.full)) {
      send("RESET");
    } else if (state.matches(NAVBAR_STATUS_ENUM.collapsed)) {
      send("NEXT");
    } else {
      send("PREV");
    }
  };

  const links =
    testcasesData &&
    testcasesStatus === LOADING_STATUS.SUCCESS &&
    testcasesData.map((item, index) => (
      <NavbarLink
        {...item}
        key={item.title}
        navStatus={state.value as NAVBAR_STATUS_ENUM}
        active={index === active}
        onClick={() => setActive(index)}
      />
    ));

  return (
    <MuiNavbar
      width={{
        base: state.value ? navbarConfig[state.value as NAVBAR_STATUS_ENUM] : navbarConfig.open,
      }}
      className={classes.navbar}
    >
      <MuiNavbar.Section className={classes.navbar_header}>
        <>
          <Button
            fullWidth
            className={classnames(classes.navbar_overview_toogle, state.value)}
            leftIcon={<EyeIcon />}
            onClick={handleNavbarStatus}
          >
            {state.value !== NAVBAR_STATUS_ENUM.collapsed ? (
              <div className={classes.navbar_overview_toogle_content}>
                <span>OVERVIEW</span>
                {state.value !== NAVBAR_STATUS_ENUM.full ? (
                  <MdSkipNext size={"1.5rem"} />
                ) : (
                  <MdSkipPrevious size={"1.5rem"} />
                )}
              </div>
            ) : (
              <></>
            )}
          </Button>
          <UnstyledButton onClick={handlerNavCollapsed} className={classes.navbar_toogle}>
            <ThemeIcon
              radius="xl"
              color="white"
              variant="default"
              className={classes.navbar_toogle_inner}
            >
              {state.value === NAVBAR_STATUS_ENUM.collapsed ? (
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
          {links}
        </Stack>
      </MuiNavbar.Section>
    </MuiNavbar>
  );
};

export default Navbar;
