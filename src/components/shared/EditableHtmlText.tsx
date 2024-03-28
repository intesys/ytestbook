import { Box, Text } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { RichTextarea } from "./RichTextarea";

type EditableHtmlText = {
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
};

export const EditableHtmlText: React.FC<EditableHtmlText> = ({
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
    value !== undefined && setInternalValue(value);
  }, [value]);

  if (editing) {
    return (
      <Box ref={ref} onBlur={onBlur}>
        <RichTextarea value={internalValue} onChange={setInternalValue} />
      </Box>
    );
  }

  return (
    <Text
      onClick={handlers.toggle}
      dangerouslySetInnerHTML={{ __html: internalValue || `Add ${name}` }}
    />
  );
};
