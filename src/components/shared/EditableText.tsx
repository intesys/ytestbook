import { Box, Input } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

type EditableText = {
  onChange?: (value: string) => void;
  value?: string;
};

export const EditableText: React.FC<EditableText> = ({ onChange, value }) => {
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
      <Box ref={ref} onBlur={onBlur}>
        <Input
          value={internalValue}
          onChange={onTextInputChange}
          onKeyDown={onKeyDown}
          autoFocus
        />
      </Box>
    );
  }

  return <span onClick={switchToEdit}>{internalValue}</span>;
};
