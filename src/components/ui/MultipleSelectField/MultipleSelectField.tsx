import { MultiSelect } from "@mantine/core";
import React from "react";
import useStyles from "./styles";
import { IOwnProps } from "./types";

const MultipleSelectField: React.FC<IOwnProps> = ({ ...rest }) => {
  const { classes } = useStyles();
  return (
    <MultiSelect classNames={classes} searchable radius="10px" {...rest} />
  );
};

export default MultipleSelectField;
