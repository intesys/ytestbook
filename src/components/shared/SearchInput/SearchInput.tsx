import { TextInput, type TextInputProps } from "@mantine/core";
import { forwardRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import classes from "./searchImput.module.scss";

interface IProps
  extends Omit<TextInputProps, "rightSectionPointerEvents" | "rightSection"> {}

export const SearchInput = forwardRef(
  (props: IProps, ref: React.Ref<HTMLInputElement> | undefined) => {
    return (
      <TextInput
        ref={ref}
        rightSectionPointerEvents="none"
        rightSection={
          <MdOutlineSearch style={{ color: "#000000", fontSize: "24px" }} />
        }
        className={classes.search}
        {...props}
      />
    );
  },
);
