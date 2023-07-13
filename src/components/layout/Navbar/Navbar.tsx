import React, { useEffect } from "react";
import useStyles from "./styles";
import EyeIcon from "../../../assets/icons/eye.svg";
import SkipIcon from "../../../assets/icons/skip.svg";
import { MediaQuery, Navbar as MuiNavbar, ScrollArea } from "@mantine/core";
import { NavbarLinks } from "../NavbarLinks/NavbarLinks";
import Button from "../../ui/Button/Button";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import { LOADING_STATUS } from "../../../reducer/types";

const Navbar: React.FC = () => {
  const { classes } = useStyles();

  const {
    state: {
      testcases: { data: testcasesData, status: testcasesStatus },
    },
    getTestcases,
  } = useYTestbookContext();

  useEffect(() => {
    getTestcases();
  }, []);

  const links =
    testcasesData &&
    testcasesStatus === LOADING_STATUS.SUCCESS &&
    testcasesData.map((item) => <NavbarLinks {...item} key={item.title} />);

  return (
    <MuiNavbar width={{ base: 360 }} p="md" className={classes.navbar}>
      <MuiNavbar.Section className={classes.navbar_header}>
        <Button className={classes.navbar_toogle} leftIcon={<EyeIcon />} fullWidth>
          <div className={classes.navbar_toogle_content}>
            <span>OVERVIEW</span>
            <SkipIcon />
          </div>
        </Button>
      </MuiNavbar.Section>
      <MuiNavbar.Section grow className={classes.navbar_links} component={ScrollArea}>
        <div className={classes.navbar_links_inner}>{links}</div>
      </MuiNavbar.Section>
    </MuiNavbar>
  );
};

export default Navbar;
