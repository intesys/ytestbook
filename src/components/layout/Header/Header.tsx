import React from "react";
import useStyles from "./styles";
import Logo from "../../../assets/logo.svg";

const Header: React.FC = () => {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.header_logo}>
        <Logo />
      </div>
      <div className={classes.header_title}>
        <h4>Testbook</h4>
        <small>Cliente</small>
      </div>
    </header>
  );
};

export default Header;
