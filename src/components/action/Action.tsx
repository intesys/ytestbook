import { Image, Text } from "@mantine/core";
import React from "react";
import classes from "./action.module.css";
import { TActionProps } from "../repositories/types";

export const Action: React.FC<TActionProps> = ({
  title,
  label,
  icon,
  action,
}) => {
  return (
    <div className={classes.action} onClick={action}>
      {title ? (
        <Text fz={24} c="white" fw={700}>
          {title}
        </Text>
      ) : null}
      <div className={classes.actionButton}>
        <div className={classes.actionButtonLabel}>
          <Image src={icon} h={40} w={40} />
          <Text fz={16} c="white" tt="uppercase">
            {label}
          </Text>
        </div>
      </div>
    </div>
  );
};
