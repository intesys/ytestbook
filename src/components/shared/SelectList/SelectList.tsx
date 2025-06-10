import {
  Checkbox,
  Combobox,
  Group,
  ScrollArea,
  Stack,
  Text,
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

  const [search, setSearch] = useState("");

  const handleValueSelect = (selectedValue: string) => {
    const newState = values.includes(selectedValue)
      ? values.filter((v) => v !== selectedValue)
      : [...values, selectedValue];

    if (onChange) {
      onChange(newState);
    }
  };

  const optionsList = options
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item, index) => (
      <Combobox.Option
        value={item}
        key={`${index}-${item}`}
        active={values.includes(item)}
        onMouseOver={() => combobox.resetSelectedOption()}
        maw={250}
      >
        <Group gap="sm" wrap="nowrap">
          <Checkbox
            checked={values.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: "none" }}
          />
          <Text span lineClamp={1} size="sm" fw="bold">
            {item}
          </Text>
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
            placeholder="Search Tag"
            value={search}
            rightSection={<IconSearch color="black" />}
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
