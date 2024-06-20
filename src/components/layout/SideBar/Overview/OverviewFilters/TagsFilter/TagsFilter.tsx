import { Badge, Button, Group, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MouseEvent, useCallback } from "react";
import { DeleteActionIcon } from "../../../../../shared/DeleteActionIcon.tsx";
import { SelectList } from "../../../../../shared/SelectList/SelectList.tsx";
import { SpinningCaret } from "../../../../../shared/SpinningCaret/SpinningCaret.tsx";

export type TTagsFilterProps = {
  values: Array<string>;
  onChange?: (values: string[]) => void;
  options?: string[];
};

export const TagsFilter = ({
  values,
  onChange,
  options = [],
}: TTagsFilterProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  const clearFilterHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (onChange) {
        onChange([]);
      }
    },
    [onChange],
  );

  return (
    <Popover radius="lg" opened={opened} onChange={toggle}>
      <Popover.Target>
        <Button
          w={180}
          justify="space-between"
          radius="md"
          color="indigo"
          variant="white"
          rightSection={
            values.length === 0 ? (
              <SpinningCaret opened={opened} />
            ) : (
              <DeleteActionIcon onClick={clearFilterHandler} />
            )
          }
          onClick={toggle}
          style={{ boxShadow: "0 2px 9px -4px rgba(0,0,0,0.08)" }}
        >
          <Group wrap="nowrap" gap={6}>
            Tags
            {values.length ? (
              <Badge size="sm" color="indigo" variant="light">
                {values.length}
              </Badge>
            ) : null}
          </Group>
        </Button>
      </Popover.Target>
      <Popover.Dropdown p="sm">
        <SelectList values={values} onChange={onChange} options={options} />
      </Popover.Dropdown>
    </Popover>
  );
};
