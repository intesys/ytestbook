import { Box, Input, Text, TextProps } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

type EditableText = {
  name?: string;
  onChange?: (value: string) => void;
  textProps?: TextProps;
  value?: string;
};

export const EditableText: React.FC<EditableText> = ({
  onChange,
  value,
  textProps,
  name,
}) => {
  const [editing, handlers] = useDisclosure(false);
  const [internalValue, setInternalValue] = useState<string>(value || "");

  const onExit = () => {
    handlers.toggle();
    onChange && onChange(internalValue);
  };

  const ref = useClickOutside(onExit);
  const onBlur = onExit;

  const switchToEdit = () => handlers.open();

  useEffect(() => {
    value !== undefined && setInternalValue(value);
  }, [value]);

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Submit on Enter
    if (e.key === "Enter") {
      e.preventDefault();
      setInternalValue(e.currentTarget.value);
      handlers.close();
      onChange && onChange(e.currentTarget.value);
    }

    // Undo on Esc
    if (e.key === "Escape") {
      handlers.close();
      setInternalValue(value ?? "");
    }
  };

  if (editing) {
    return (
      <Box ref={ref} onBlur={onBlur} flex={1}>
        <Input
          value={internalValue}
          onChange={onTextInputChange}
          onKeyDown={onKeyDown}
          autoFocus
        />
      </Box>
    );
  }

  const isEmpty = internalValue === "";

  return (
    <Text
      span
      c={isEmpty ? "dimmed" : textProps?.c}
      {...textProps}
      onClick={switchToEdit}
    >
      {isEmpty ? `Add ${name}` : internalValue}
    </Text>
  );
};
