import React from "react";
import useStyles from "./styles";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";

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
        <SvgIcon iconName="logo" />
      </div>
      <div className={classes.header_title}>
        <h4>{testbookData?.name}</h4>
        <small>{testbookData?.client}</small>
      </div>
    </header>
  );
};

export default Header;
