import React from "react";
import useStyles from "./styles";
import Logo from "../../../assets/logo.svg";
import { useYTestbookContext } from "../../../context/useYTestbookContext";

const Header: React.FC = () => {
  const { classes } = useStyles();

  const {
    state: {
      testbook: { data: testbookData },
    },
  } = useYTestbookContext();

  return (
    <header className={classes.header}>
      <div className={classes.header_logo}>
        <Logo />
      </div>
      <div className={classes.header_title}>
        <h4>{testbookData?.name}</h4>
        <small>{testbookData?.client}</small>
      </div>
    </header>
  );
};

export default Header;
