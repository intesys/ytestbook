import {
  Checkbox,
  Combobox,
  Group,
  ScrollArea,
  Stack,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export type TSelectList = {
  values: string[];
  options: string[];
  onChange?: (values: string[]) => void;
};
export function SelectList({ options = [], values, onChange }: TSelectList) {
  const combobox = useCombobox();

  const [value, setValue] = useState<TSelectList["values"]>(values);
  const [search, setSearch] = useState("");

  const handleValueSelect = (val: string) =>
    setValue((current) => {
      const newState = current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val];

      if (onChange) {
        onChange(newState);
      }
      return newState;
    });

  const optionsList = options
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item, index) => (
      <Combobox.Option
        value={item}
        key={`${index}-${item}`}
        active={value.includes(item)}
        onMouseOver={() => combobox.resetSelectedOption()}
      >
        <Group gap="sm">
          <Checkbox
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: "none" }}
          />
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Stack>
        <Combobox.EventsTarget>
          <TextInput
            variant="filled"
            radius="md"
            placeholder="Search tag"
            value={search}
            rightSection={<IconSearch />}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
              combobox.updateSelectedOptionIndex();
            }}
          />
        </Combobox.EventsTarget>

        <ScrollArea h={200}>
          <Combobox.Options>
            {optionsList.length > 0 ? (
              optionsList
            ) : (
              <Combobox.Empty>Nothing found!</Combobox.Empty>
            )}
          </Combobox.Options>
        </ScrollArea>
      </Stack>
    </Combobox>
  );
}
