import { Text } from "@mantine/core";
import classes from "./home.module.scss";
import { TActionProps } from "./types";

export function Action({ title, label, icon, action }: TActionProps) {
  return (
    <div className={classes.action} onClick={action}>
      <Text fz={24} c="white" fw={700}>
        {title}
      </Text>
      <div className={classes.actionButton}>
        <div className={classes.actionButtonLabel}>
          <img src={icon} height={40} width={40} />
          <Text fz={16} c="white" tt="uppercase">
            {label}
          </Text>
        </div>
      </div>
    </div>
  );
}
