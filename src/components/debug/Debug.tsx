import { Drawer, Group, Stack, TextInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { JsonData, JsonEditor } from "json-edit-react";

export type DebugProps = {
  data: JsonData;
};

export const Debug = ({ data }: DebugProps) => {
  const [debugOpen, { toggle: toggleDebug, close: closeDebug }] =
    useDisclosure(false);
  const debugSearch = useField({ initialValue: "" });

  useHotkeys([["ctrl+D", () => toggleDebug()]]);

  return (
    <Drawer
      title="Debug"
      opened={debugOpen}
      onClose={closeDebug}
      size="50%"
      closeOnClickOutside={false}
    >
      <Stack gap="md">
        <Group justify="stretch">
          <TextInput
            w="100%"
            leftSection={<IconSearch />}
            placeholder="Search in project..."
            {...debugSearch.getInputProps()}
          />
        </Group>
        <JsonEditor
          data={data}
          minWidth="100%"
          theme="githubLight"
          enableClipboard={false}
          searchText={debugSearch.getValue()}
          restrictAdd
          restrictEdit
          restrictDelete
          restrictDrag
          restrictTypeSelection
          collapseAnimationTime={200}
          stringTruncate={50}
          rootFontSize={12}
          collapse={2}
        />
      </Stack>
    </Drawer>
  );
};
