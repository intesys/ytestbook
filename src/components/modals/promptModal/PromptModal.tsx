import {
  Button,
  ButtonProps,
  Group,
  Stack,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { useField } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { ReactNode, useCallback } from "react";

type TPromptModalCommonProps = {
  cancelButtonLabel?: string;
  cancelButtonProps?: ButtonProps;
  children?: ReactNode;
  handleCancel?: () => void;
  handleSubmit?: (value: string) => void;
  initialValue?: string;
  multiline?: boolean;
  submitButtonLabel?: string;
  submitButtonProps?: ButtonProps;
  validation?: (value: string) => ReactNode | undefined;
};

export type TPromptModalProps = TPromptModalCommonProps &
  (
    | ({ multiline: true } & { inputProps: TextareaProps })
    | ({ multiline: false } & { inputProps: TextInputProps })
  );

export function PromptModal({
  id,
  context,
  innerProps: {
    cancelButtonLabel = "Cancel",
    cancelButtonProps = {},
    children = null,
    handleCancel,
    handleSubmit,
    initialValue = "",
    inputProps = {},
    multiline = false,
    submitButtonLabel = "Submit",
    submitButtonProps = {},
    validation,
  },
}: ContextModalProps<TPromptModalProps>) {
  const close = useCallback(() => {
    context.closeModal(id);
  }, [context, id]);

  const field = useField({
    initialValue,
    validate: validation ?? undefined,
  });

  const cancelHandler = useCallback(() => {
    if (handleCancel) {
      handleCancel();
    }
    close();
  }, [close, handleCancel]);

  const submitHandler = useCallback(() => {
    field.validate().then((errors) => {
      if (errors) {
        return;
      }

      if (handleSubmit) {
        handleSubmit(field.getValue());
      }
      close();
    });
  }, [close, field, handleSubmit]);

  return (
    <Stack>
      {children}
      {multiline ? (
        <Textarea
          data-autofocus
          {...field.getInputProps()}
          {...(inputProps as TextareaProps)}
        />
      ) : (
        <TextInput
          data-autofocus
          {...field.getInputProps()}
          {...(inputProps as TextInputProps)}
        />
      )}
      <Group justify="flex-end" gap="md">
        <Button
          variant="outline"
          onClick={cancelHandler}
          {...cancelButtonProps}
        >
          {cancelButtonLabel}
        </Button>
        <Button onClick={submitHandler} {...submitButtonProps}>
          {submitButtonLabel}
        </Button>
      </Group>
    </Stack>
  );
}
