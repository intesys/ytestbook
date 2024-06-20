import {
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
import { TCollaborator } from "../../../schema.ts";
import { Avatars } from "../../avatars/Avatars.tsx";

interface TAssigneeSelectList {
  value: TCollaborator | null;
  options: TCollaborator[];
  onChange?: (value: TCollaborator) => void;
}

export const AssigneeSelectList = ({
  value,
  onChange,
  options = [],
}: TAssigneeSelectList) => {
  const combobox = useCombobox();

  const [search, setSearch] = useState("");

  const handleValueSelect = (selectedValue: string) => {
    const foundCollaborator = options.find(
      (collaborator: TCollaborator) => collaborator.id === selectedValue,
    );

    if (onChange && foundCollaborator) {
      onChange(foundCollaborator);
    }
  };

  const optionsList = options
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase().trim()),
    )
    .map((item) => (
      <Combobox.Option
        value={item.id}
        key={item.id}
        active={value === item}
        onMouseOver={() => combobox.resetSelectedOption()}
        bg={value === item ? "indigo.1" : undefined}
        maw={250}
      >
        <Group gap="xs" wrap="nowrap">
          <Avatars collaborators={[item]} withTooltip={false} />
          <Text span lineClamp={1} size="sm" fw="bold">
            {item.name}
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
            placeholder="Search Assignee"
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
};
