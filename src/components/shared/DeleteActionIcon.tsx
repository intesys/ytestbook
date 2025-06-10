import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { MouseEvent, useCallback } from "react";

type TDeleteActionIconProps = ActionIconProps & {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const DeleteActionIcon = ({
  onClick,
  ...rest
}: TDeleteActionIconProps) => {
  const clickHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick],
  );
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
