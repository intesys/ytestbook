import { Button, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TCollaborator } from "../../../../../../schema.ts";
import { SpinningCaret } from "../../../../../shared/SpinningCaret/SpinningCaret.tsx";

export type TAssigneeFilterProps = {
  value: TCollaborator | null;
  onChange?: (value: TCollaborator | null) => void;
};

export const AssigneeFilter = ({ value, onChange }: TAssigneeFilterProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Popover radius="lg" opened={opened} onChange={toggle}>
      <Popover.Target>
        <Button
          w={150}
          justify="space-between"
          radius="md"
          color="indigo"
          variant="white"
          rightSection={<SpinningCaret opened={opened} />}
          onClick={toggle}
          style={{ boxShadow: "0 2px 9px -4px rgba(0,0,0,0.08)" }}
        >
          Assignee
        </Button>
      </Popover.Target>
      <Popover.Dropdown p="sm">
        ASSIGNEE {value ? value : null}
      </Popover.Dropdown>
    </Popover>
  );
};
