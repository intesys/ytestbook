import { Box, Text, TextProps } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { isEditableHtmlTextPopupVisible } from "../../lib/helpers/isEditableHtmlTextPopupVisible";
import { RichTextarea } from "./RichTextarea/RichTextarea";

type EditableHtmlTextProps = {
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
  textProps?: TextProps;
};

const EMPTY_VALUE = "<p></p>";

export const EditableHtmlText = ({
  name,
  onChange,
  value,
  textProps,
}: EditableHtmlTextProps) => {
  const [editing, handlers] = useDisclosure(false);
  const [internalValue, setInternalValue] = useState<string>(
    // IMPORTANT: in this case we want to use OR instead of ?? because
    //            we need to treat "" as falsy value.
    value || EMPTY_VALUE,
  );

  const onExit = () => {
    if (isEditableHtmlTextPopupVisible()) {
      return;
    }

    handlers.toggle();
    if (onChange) {
      onChange(internalValue);
    }
  };

  const ref = useClickOutside(onExit);
  const onBlur = onExit;

  useEffect(() => {
    // IMPORTANT: in this case we want to use OR instead of ?? because
    //            we need to treat "" as falsy value.
    setInternalValue(value || EMPTY_VALUE);
  }, [value]);

  if (editing) {
    return (
      <Box ref={ref} onBlur={onBlur}>
        <RichTextarea value={internalValue} onChange={setInternalValue} />
      </Box>
    );
  }

  const isEmpty = internalValue === "" || internalValue === EMPTY_VALUE;

  return (
    <Text
      c={isEmpty ? "dimmed" : textProps?.c}
      {...textProps}
      onClick={handlers.toggle}
      dangerouslySetInnerHTML={{
        __html: isEmpty ? `<p>Add ${name}</p>` : internalValue,
      }}
    />
  );
};
