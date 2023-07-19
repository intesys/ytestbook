import React from "react";
import { Paper } from "@mantine/core";
import useStyles from "./styles";
import { IProps } from "./types";

const UserLogin: React.FC<IProps> = ({ title, children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.card}>
      {title ? <h3 className={classes.card_header}>{title}</h3> : null}
      <Paper className={classes.card_content} p={32} mt={16} radius="xl">
        {children}
      </Paper>
    </div>
  );
};

export default UserLogin;
