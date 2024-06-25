import { Image, Text } from "@mantine/core";
import React from "react";
import classes from "./home.module.css";
import { TActionProps } from "./types";

export const Action: React.FC<TActionProps> = ({
  title,
  label,
  icon,
  action,
}) => {
  return (
    <div className={classes.action} onClick={action}>
      <Text fz={24} c="white" fw={700}>
        {title}
      </Text>
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
