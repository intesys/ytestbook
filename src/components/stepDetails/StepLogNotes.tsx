import { ActionIcon, Button, Flex, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconWindowMaximize } from "@tabler/icons-react";

interface IProps {
  notes?: string;
}

const NOTES_LIMIT_LENGTH = 10;

export const StepLogNotes = ({ notes }: IProps) => {
  return notes ? (
    notes.length > NOTES_LIMIT_LENGTH ? (
      <Group gap={6} wrap="nowrap">
        <Text size="sm" fs="italic">
          {notes.substring(0, NOTES_LIMIT_LENGTH)}...
        </Text>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() =>
            modals.open({
              title: "Notes",
              centered: true,
              children: (
                <>
                  <Text>{notes}</Text>
                  <Flex justify="flex-end">
                    <Button onClick={() => modals.closeAll()} mt="md">
                      Close
                    </Button>
                  </Flex>
                </>
              ),
            })
          }
        >
          <IconWindowMaximize />
        </ActionIcon>
      </Group>
    ) : (
      notes
    )
  ) : (
    <Text size="sm" c="dimmed" fs="italic">
      &mdash;
    </Text>
  );
};
