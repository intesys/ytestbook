import React from "react";
import Header from "../Header/Header";
import { IProps } from "./types";
import useStyles from "./styles";
import Navbar from "../Navbar/Navbar";

const Layout: React.FC<IProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.app_layout}>
      <div className={classes.app_header}>
        <Header />
      </div>
      <div className={classes.app_wrapper}>
        <div className={classes.app_sidebar}>
          <Navbar />
        </div>
        <div className={classes.app_main}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
