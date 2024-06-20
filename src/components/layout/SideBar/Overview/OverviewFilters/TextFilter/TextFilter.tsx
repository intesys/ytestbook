import { TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { DeleteActionIcon } from "../../../../../shared/DeleteActionIcon.tsx";
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

  const changeValue = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);
      searchHandle(newValue);
    },
    [setLocalValue, searchHandle],
  );

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      changeValue(value);
    },
    [changeValue],
  );

  const clearFilterHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      changeValue("");

      if (onChange) {
        // This will trigger immediately, without waiting for the debounce.
        onChange("");
      }
    },
    [changeValue, onChange],
  );

  return (
    <TextInput
      value={localValue}
      radius="md"
      placeholder="Search"
      onChange={changeHandler}
      rightSection={
        value === "" ? (
          <IconSearch size={20} color="black" />
        ) : (
          <DeleteActionIcon onClick={clearFilterHandler} />
        )
      }
      style={{ boxShadow: "0 2px 9px -4px rgba(0,0,0,0.08)" }}
    />
  );
};
