import { Avatar, Tooltip } from "@mantine/core";
import { useState } from "react";
import classes from "./avatars.module.scss";

interface IProps {
  data: {
    path?: string;
    firstName: string;
    surname: string;
  }[];
}

export const Avatars: React.FC<IProps> = ({ data }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const renderedAvatars = isShow ? data : data.slice(0, 3);
  const hiddenCount = data.length - 3;

  const handleToggle = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <Avatar.Group spacing="xs">
      {renderedAvatars.map(({ firstName, surname, path }) => (
        <Tooltip
          key={`${firstName} ${surname}`}
          label={`${firstName} ${surname}`}
          withArrow
        >
          <Avatar
            alt={`${firstName} ${surname}`}
            src={path}
            radius="xl"
            className={classes.avatar}
          >
            {firstName[0]}
            {surname[0]}
          </Avatar>
        </Tooltip>
      ))}

      {data.length > 3 && (
        <Avatar radius="xl" className={classes.button} onClick={handleToggle}>
          {isShow ? `-${hiddenCount}` : `+${hiddenCount}`}
        </Avatar>
      )}
    </Avatar.Group>
  );
};
