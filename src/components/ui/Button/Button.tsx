import { ButtonProps, Button as MuiButton } from "@mantine/core";
import React from "react";
import useStyles from "./styles";
import { IProps } from "./types";

const Button: React.FC<IProps & ButtonProps> = ({ children, ...props }) => {
  const { classes } = useStyles();

  return (
    <MuiButton {...props} classNames={classes} radius={8}>
      {children}
    </MuiButton>
  );
};

export default Button;
