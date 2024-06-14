import { Button, Popover } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
          Tags {values.length ? `(${values.length})` : null}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p="sm">
        <SelectList values={values} onChange={onChange} options={options} />
      </Popover.Dropdown>
    </Popover>
  );
};
