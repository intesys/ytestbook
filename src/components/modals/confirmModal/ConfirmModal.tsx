import { Button, ButtonProps, Group, Stack } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { ReactNode, useCallback } from "react";

export type TConfirmModalProps = {
  handleCancel?: () => void;
  handleConfirm?: () => void;
  confirmButtonLabel?: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonLabel?: string;
  cancelButtonProps?: ButtonProps;
  children?: ReactNode;
};

export function ConfirmModal({
  id,
  context,
  innerProps: {
    children = null,
    handleConfirm,
    handleCancel,
    confirmButtonLabel = "Confirm",
    cancelButtonLabel = "Cancel",
    confirmButtonProps = {},
    cancelButtonProps = {},
  },
}: ContextModalProps<TConfirmModalProps>) {
  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const cancelHandler = useCallback(() => {
    if (handleCancel) {
      handleCancel();
    }
    close();
  }, [close, handleCancel]);

  const confirmHandler = useCallback(() => {
    if (handleConfirm) {
      handleConfirm();
    }
    close();
  }, [close, handleConfirm]);

  return (
    <Stack>
      {children}
      <Group justify="flex-end" gap="md">
        <Button
          variant="outline"
          onClick={cancelHandler}
          {...cancelButtonProps}
        >
          {cancelButtonLabel}
        </Button>
        <Button onClick={confirmHandler} {...confirmButtonProps}>
          {confirmButtonLabel}
        </Button>
      </Group>
    </Stack>
  );
}
