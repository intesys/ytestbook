import React from "react";
import { Link } from "react-router-dom";
import { TestbookInfo } from "../../../types/testbook";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";
import useStyles from "./styles";

const Header: React.FC<TestbookInfo> = ({ name, client }) => {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.header_logo}>
        <Link to="/">
          <SvgIcon iconName="logo" wrapperStyle={classes.logo_wrapper} />
        </Link>
      </div>
      <div className={classes.header_title}>
        <h4>{name}</h4>
        <small>{client}</small>
      </div>
    </header>
  );
};

export default Header;
