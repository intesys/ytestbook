import { ActionIcon, Button, Group, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { MouseEvent, useCallback } from "react";
import { TCollaborator } from "../../../../../../schema.ts";
import { Avatars } from "../../../../../avatars/Avatars.tsx";
import { AssigneeSelectList } from "../../../../../shared/AssigneeSelectList/AssigneeSelectList.tsx";
import { SpinningCaret } from "../../../../../shared/SpinningCaret/SpinningCaret.tsx";

export type TAssigneeFilterProps = {
  value: TCollaborator | null;
  onChange?: (value: TCollaborator | null) => void;
  options?: TCollaborator[];
};

export const AssigneeFilter = ({
  value,
  onChange,
  options = [],
}: TAssigneeFilterProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  const changeHandler = useCallback(
    (value: TCollaborator | null) => {
      toggle();

      if (onChange) {
        onChange(value);
      }
    },
    [toggle, onChange],
  );

  const clearFilterHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (onChange) {
        onChange(null);
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
    <Popover radius="lg" opened={opened} onChange={toggle}>
      <Popover.Target>
        <Button
          miw={180}
          justify="space-between"
          radius="md"
          color="indigo"
          variant="white"
          rightSection={
            value === null ? <SpinningCaret opened={opened} /> : deleteButton
          }
          onClick={toggle}
          style={{ boxShadow: "0 2px 9px -4px rgba(0,0,0,0.08)" }}
        >
          {value === null ? (
            "Assignee"
          ) : (
            <Group wrap="nowrap" gap={6}>
              <Avatars
                collaborators={[value]}
                avatarProps={{ size: "sm" }}
                withTooltip={false}
              />
              <span>{value.name}</span>
            </Group>
          )}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p="sm">
        <AssigneeSelectList
          options={options}
          value={value}
          onChange={changeHandler}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
