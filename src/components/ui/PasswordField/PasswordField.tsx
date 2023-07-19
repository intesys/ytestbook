import { PasswordInput } from "@mantine/core";
import React from "react";
import useStyles from "./styles";
import { IProps } from "./types";

const PasswordField: React.FC<IProps> = ({
  label,
  placeholder,
  required,
  value,
  type,
  variant = "light",
  onChange,
  ...props
}) => {
  const { classes } = useStyles(variant);

  return (
    <PasswordInput
      label={label}
      autoComplete="new-password"
      placeholder={placeholder}
      required={required}
      classNames={classes}
      radius="10px"
      value={value}
      type={type}
      {...props}
      onChange={(event) => onChange && onChange(event.currentTarget.value)}
    />
  );
};

export default PasswordField;
