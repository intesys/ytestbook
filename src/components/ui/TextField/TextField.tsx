import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";
import useStyles from "./styles";
import { IProps } from "./types";

const TextField: React.FC<IProps & TextInputProps & React.RefAttributes<HTMLInputElement>> = ({
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
    <TextInput
      label={label}
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

export default TextField;
