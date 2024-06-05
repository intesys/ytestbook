import { Box, Text } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { RichTextarea } from "./RichTextarea";
import { isEditableHtmlTextPopupVisible } from "../../lib/helpers/isEditableHtmlTextPopupVisible";

type EditableHtmlTextProps = {
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
};

export const EditableHtmlText = ({
  name,
  onChange,
  value,
}: EditableHtmlTextProps) => {
  const [editing, handlers] = useDisclosure(false);
  const [internalValue, setInternalValue] = useState<string>(value ?? "");

  const onExit = () => {
    if (isEditableHtmlTextPopupVisible()) {
      return;
    }

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
