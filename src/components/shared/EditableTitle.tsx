import { Input, Title } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

type EditableTitle = {
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
};

export const EditableTitle: React.FC<EditableTitle> = ({
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
        size="xl"
      />
    );
  }

  return (
    <Title onClick={handlers.toggle}>{internalValue || `Add ${name}`}</Title>
  );
};
