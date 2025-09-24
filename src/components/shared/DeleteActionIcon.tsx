import { MouseEvent, useCallback } from "react";
import { IconX } from "@tabler/icons-react";
import { ActionIcon, ActionIconProps } from "@mantine/core";

type TDeleteActionIconProps = ActionIconProps & {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const DeleteActionIcon = ({
  onClick,
  ...rest
}: TDeleteActionIconProps) => {
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ActionIcon
      color="red"
      onClick={clickHandler}
      size="sm"
      variant="subtle"
      {...rest}
    >
      <IconX size={14} />
    </ActionIcon>
  );
};
