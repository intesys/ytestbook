import {
  ActionIcon,
  ActionIconProps,
  Button,
  Group,
  Popover,
  PopoverProps,
  Text,
  Tooltip,
  TooltipProps,
} from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

import React, { MouseEvent, ReactNode, useCallback, useState } from "react";

export interface ActionIconWithConfirmProps extends ActionIconProps {
  confirmCancelText?: ReactNode;
  confirmOkText?: ReactNode;
  confirmTitle?: ReactNode;
  dataTestid?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  onConfirm?: (event: MouseEvent) => void;
  tooltip?: ReactNode;
  tooltipProps?: Partial<TooltipProps>;
  popoverProps?: Partial<PopoverProps>;
}

export const ActionIconWithConfirm: React.FC<ActionIconWithConfirmProps> = ({
  confirmCancelText,
  confirmOkText,
  confirmTitle,
  dataTestid,
  disabled,
  icon = <IconQuestionMark size={16} />,
  isLoading = false,
  onConfirm,
  tooltip,
  tooltipProps,
  popoverProps,
  ...rest
}) => {
  const [opened, setOpened] = useState(false);

  const actionIconClickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setOpened((opened) => !opened);
  };

  const onConfirmHandler = useCallback(
    (event: MouseEvent) => {
      setOpened(false);

      if (onConfirm) {
        onConfirm(event);
      }
    },
    [onConfirm],
  );

  const popoverClickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <Popover
      onChange={setOpened}
      opened={opened}
      withArrow
      withinPortal
      keepMounted={true}
      zIndex={1002}
      {...popoverProps}
    >
      <Popover.Target>
        <Tooltip label={tooltip} disabled={!tooltip} {...tooltipProps}>
          <ActionIcon
            data-testid={dataTestid}
            disabled={isLoading || disabled}
            loading={isLoading}
            onClick={actionIconClickHandler}
            size="sm"
            variant="outline"
            {...rest}
          >
            {icon}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown
        py="xs"
        data-testid="action-icon-with-confirm-popover"
        onClick={popoverClickHandler}
      >
        <Text size="sm" fw="bold">
          {confirmTitle ?? "Are you sure?"}
        </Text>
        <Group justify="center" wrap="nowrap" gap="xs" mt="xs">
          <Button
            data-testid="action-icon-with-confirm-cancel"
            onClick={() => setOpened(false)}
            size="xs"
            variant="default"
          >
            {confirmCancelText ?? "Cancel"}
          </Button>
          <Button
            autoFocus
            color="red"
            data-testid="action-icon-with-confirm-submit"
            onClick={onConfirmHandler}
            size="xs"
            type="submit"
          >
            {confirmOkText ?? "Delete"}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
