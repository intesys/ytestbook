import { TextInput } from "@mantine/core";
import { useDebounceCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEvent } from "react";
import { TOverviewFilters } from "../../OverviewFilters.tsx";

type TTextFilterProps = {
  value: TOverviewFilters["textFilter"];
  onChange: (value: TOverviewFilters["textFilter"]) => void;
};

export const TextFilter = ({ value, onChange }: TTextFilterProps) => {
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const debouncedChangeHandler = useDebounceCallback(
    changeHandler as unknown as () => void, // Mantine types for onChange are wrpng :(
    500,
  );

  return (
    <TextInput
      value={value}
      radius="md"
      placeholder="Search"
      onChange={debouncedChangeHandler}
      rightSection={<IconSearch size={20} color="black" />}
      style={{ boxShadow: "0 2px 9px -4px rgba(0,0,0,0.08)" }}
    />
  );
};
