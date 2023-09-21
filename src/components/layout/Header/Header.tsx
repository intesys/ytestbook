import React from "react";
import useStyles from "./styles";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";

const Header: React.FC = () => {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.header_logo}>
        <SvgIcon iconName="logo" />
      </div>
      <div className={classes.header_title}>
        <h4>Testbook title</h4>
        <small>Testbook client</small>
      </div>
    </header>
  );
};

export default Header;
