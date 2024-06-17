import { ActionIcon, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { TOverviewFilters } from "../../OverviewFilters.tsx";

type TTextFilterProps = {
  value: TOverviewFilters["textFilter"];
  onChange: (value: TOverviewFilters["textFilter"]) => void;
};

export const TextFilter = ({ value, onChange }: TTextFilterProps) => {
  const [localValue, setLocalValue] = useState(value);

  const searchHandle = useDebouncedCallback((value: string) => {
    if (onChange) {
      onChange(value);
    }
  }, 500);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    changeValue(value);
  };

  const changeValue = (newValue: string) => {
    setLocalValue(newValue);
    searchHandle(newValue);
  };

  const clearFilterHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      changeValue("");

      if (onChange) {
        onChange("");
      }
    },
    [onChange],
  );

  const deleteButton = (
    <ActionIcon
      color="red"
      variant="subtle"
      size="sm"
      onClick={clearFilterHandler}
    >
      <IconX size={14} />
    </ActionIcon>
  );

  return (
    <TextInput
      value={localValue}
      radius="md"
      placeholder="Search"
      onChange={changeHandler}
      rightSection={
        value === "" ? <IconSearch size={20} color="black" /> : deleteButton
      }
      style={{ boxShadow: "0 2px 9px -4px rgba(0,0,0,0.08)" }}
    />
  );
};
