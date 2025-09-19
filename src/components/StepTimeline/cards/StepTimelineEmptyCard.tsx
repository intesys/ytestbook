import { Dispatch, SetStateAction } from "react";
import { IconCactus } from "@tabler/icons-react";
import { Anchor, Card, CardProps, Stack, Text } from "@mantine/core";
import { ActivityType } from "../stepTimeline.types.ts";
import { ACTIVITIES } from "../stepTimeline.utils.ts";

interface StepTimelineEmptyCardProps extends CardProps {
  filteredActivities: ActivityType[];
  setFilteredActivities: Dispatch<SetStateAction<ActivityType[]>>;
}

export const StepTimelineEmptyCard = ({
  filteredActivities,
  setFilteredActivities,
  ...cardProps
}: StepTimelineEmptyCardProps) => (
  <Card radius="md" {...cardProps}>
    <Stack justify="center" align="center" py="md">
      <Text inline span c="dimmed">
        <IconCactus size={40} color="currentColor" />
      </Text>
      <Stack gap="md" justify="center" align="center">
        <Text inline span fw="bold" ta="center">
          Nothing here!
        </Text>
        <Stack gap={4}>
          <Text inline span ta="center">
            There are no activities to show!
          </Text>
          {filteredActivities.length === 0 ? (
            <Text inline span ta="center">
              {" "}
              Try to{" "}
              <Anchor
                onClick={() =>
                  setFilteredActivities(ACTIVITIES.map((a) => a.value))
                }
                style={{ cursor: "pointer" }}
              >
                reset the filters
              </Anchor>{" "}
              to get started.
            </Text>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  </Card>
);
