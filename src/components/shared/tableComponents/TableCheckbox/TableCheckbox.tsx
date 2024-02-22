import { ThemeIcon } from "@mantine/core";
import { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineRemoveCircle } from "react-icons/md";
import classes from "./tableCheckbox.module.scss";

export const TableCheckbox = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <ThemeIcon
      variant="transparent"
      className={classes.checkbox}
      onClick={handleChange}
    >
      {checked ? (
        <MdOutlineRemoveCircle style={{ fontSize: "18px", color: "#0F33CE" }} />
      ) : (
        <MdOutlineAddCircleOutline
          style={{ fontSize: "18px", color: "#1C1B1F" }}
        />
      )}
    </ThemeIcon>
  );
};
