import { MouseEvent, useCallback } from "react";
import { Button, Group, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Avatars } from "@/components/avatars/Avatars.tsx";
import { AssigneeSelectList } from "@/components/shared/AssigneeSelectList/AssigneeSelectList.tsx";
import { DeleteActionIcon } from "@/components/shared/DeleteActionIcon.tsx";
import { SpinningCaret } from "@/components/shared/SpinningCaret/SpinningCaret.tsx";
import { TCollaborator } from "@/types/schema.ts";

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
    [toggle, onChange]
  );

  const clearFilterHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (onChange) {
      onChange(null);
    }
  };

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
            value === null ? (
              <SpinningCaret opened={opened} />
            ) : (
              <DeleteActionIcon onClick={clearFilterHandler} />
            )
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
