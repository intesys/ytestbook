import { Input, Text } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

type EditableText = {
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
};

export const EditableText: React.FC<EditableText> = ({
  name,
  onChange,
  value,
}) => {
  const [editing, handlers] = useDisclosure(false);
  const [internalValue, setInternalValue] = useState<string>(value || "");

  const onExit = () => {
    handlers.toggle();
    onChange && onChange(internalValue);
  };

  const ref = useClickOutside(onExit);
  const onBlur = onExit;

  useEffect(() => {
    value && setInternalValue(value);
  }, [value]);

  if (editing) {
    return (
      <Input
        defaultValue={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={onBlur}
        ref={ref}
      />
    );
  }

  return (
    <Text onClick={handlers.toggle}>{internalValue || `Add ${name}`}</Text>
  );
};
