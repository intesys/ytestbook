import {
  Center,
  Group,
  Loader,
  Navbar as MuiNavbar,
  Stack,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useMachine } from "@xstate/react";
import classnames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { MdCloseFullscreen, MdOpenInFull, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import EyeIcon from "../../../assets/icons/eye.svg";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import { statusIcon } from "../../../lib/misc";
import { LOADING_STATUS } from "../../../reducer/types";
import Button from "../../ui/Button/Button";
import SegmentedField from "../../ui/SegmentedField/SegmentedField";
import TableAdvance from "../../ui/TableAdvance/TableAdvance";
import TextField from "../../ui/TextField/TextField";
import { NavbarLink } from "../NavbarLink/NavbarLink";
import { NAVBAR_STATUS_ENUM, navbarConfig, toggleMachine } from "./const";
import useStyles from "./styles";
import { ITestcaseModel, StatusEnum } from "../../../api/models";
import _ from "lodash";

const Navbar: React.FC = () => {
  const { classes } = useStyles();
  const [active, setActive] = useState(0);
  const [state, send] = useMachine(toggleMachine);

  const {
    state: {
      testcases: { data: testcasesData, status: testcasesStatus },
    },
    setTestcase,
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

  const handleNavCollapsed = () => {
    if (state.matches(NAVBAR_STATUS_ENUM.full)) {
      send("RESET");
    } else if (state.matches(NAVBAR_STATUS_ENUM.collapsed)) {
      send("NEXT");
    } else {
      send("PREV");
    }
  };

  const handleClickLink = (id: string, index: number) => {
    const testcase = _.find(testcasesData, { id });
    testcase && setTestcase(testcase);
    setActive(index);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "title", //simple recommended way to define a column
        header: "Title",
      },
    ],
    []
  );

  const links =
    testcasesData &&
    testcasesStatus === LOADING_STATUS.SUCCESS &&
    testcasesData.map((item, index) => (
      <NavbarLink
        {...item}
        key={item.title}
        navStatus={state.value as NAVBAR_STATUS_ENUM}
        active={index === active}
        onClick={(id) => handleClickLink(id, index)}
      />
    ));

  const filters = (
    <>
      <Group>
        <TextField placeholder="Search" rightSection={<IconSearch />} />
        <SegmentedField
          data={[
            {
              label: statusIcon({
                status: "All",
                size: 20,
              }),
              value: "",
            },
            {
              label: statusIcon({
                status: StatusEnum.Blocked,
                size: 20,
              }),
              value: StatusEnum.Blocked,
            },
            {
              label: statusIcon({
                status: StatusEnum.Cancelled,
                size: 20,
              }),
              value: StatusEnum.Cancelled,
            },
            {
              label: statusIcon({ status: StatusEnum.Done, size: 20 }),
              value: StatusEnum.Done,
            },
            {
              label: statusIcon({ status: StatusEnum.Fail, size: 20 }),
              value: StatusEnum.Fail,
            },
            {
              label: statusIcon({ status: StatusEnum.Paused, size: 20 }),
              value: StatusEnum.Paused,
            },
            {
              label: statusIcon({ status: StatusEnum.Pending, size: 20 }),
              value: StatusEnum.Pending,
            },
            {
              label: statusIcon({ status: StatusEnum.Todo, size: 20 }),
              value: StatusEnum.Todo,
            },
          ]}
        />
      </Group>
    </>
  );

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
          <UnstyledButton onClick={handleNavCollapsed} className={classes.navbar_toogle}>
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
        {/*<Stack justify="center" spacing={0}>
          {testcasesStatus === LOADING_STATUS.SUCCESS &&
            (state.value !== NAVBAR_STATUS_ENUM.full ? (
              links
            ) : (
              <TableAdvance<ITestcaseModel>
                data={testcasesData ?? []}
                columns={columns}
                tableFilters={filters}
              />
            ))}
          {testcasesStatus === LOADING_STATUS.LOADING && (
            <Center>
              <Loader />
            </Center>
          )}
          </Stack>*/}
      </MuiNavbar.Section>
    </MuiNavbar>
  );
};

export default Navbar;
