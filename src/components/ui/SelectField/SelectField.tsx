import { Select } from "@mantine/core";
import React from "react";
import useStyles from "./styles";
import { IOwnProps } from "./types";

const SelectField: React.FC<IOwnProps> = ({ ...rest }) => {
  const { classes } = useStyles();
  return <Select classNames={classes} searchable radius="10px" {...rest} />;
};

export default SelectField;
