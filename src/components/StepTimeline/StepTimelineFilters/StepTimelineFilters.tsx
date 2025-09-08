import {
  Button,
  Checkbox,
  Combobox,
  Group,
  Popover,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { ActivityType, SortOrder } from "../stepTimeline.types.ts";
import { ACTIVITIES } from "../stepTimeline.utils.ts";
import classes from "./StepTimelineFilters.module.css";

interface StepTimelineFiltersProps {
  filteredActivities: ActivityType[];
  setFilteredActivities: Dispatch<SetStateAction<ActivityType[]>>;
  setSort: Dispatch<SetStateAction<SortOrder>>;
  sort: SortOrder;
}

export const StepTimelineFilters = ({
  filteredActivities,
  setFilteredActivities,
  setSort,
  sort,
}: StepTimelineFiltersProps) => {
  const [activitiesListOpened, activitiesListHandlers] = useDisclosure(false);

  const sortHandler = useCallback(() => {
    if (setSort !== undefined) {
      setSort((current) => (current === "asc" ? "desc" : "asc"));
    }
  }, [setSort]);

  const toggleSelectAllHandler = useCallback(() => {
    if (filteredActivities.length === ACTIVITIES.length) {
      setFilteredActivities([]);
    } else {
      setFilteredActivities(ACTIVITIES.map((a) => a.value));
    }
  }, [filteredActivities.length, setFilteredActivities]);

  const filteredActivitiesChangeHandler = useCallback(
    (values: string[]) => {
      if (setFilteredActivities) {
        setFilteredActivities(values as ActivityType[]);
      }
    },
    [setFilteredActivities],
  );

  return (
    <Group align="center" justify="flex-end">
      <Button.Group>
        <Popover
          opened={activitiesListOpened}
          onChange={activitiesListHandlers.toggle}
          trapFocus
          withArrow
          width={300}
          position="bottom-end"
          arrowOffset={20}
          arrowSize={10}
          shadow="md"
        >
          <Popover.Target>
            <Button
              variant="default"
              onClick={activitiesListHandlers.toggle}
              rightSection={<Combobox.Chevron />}
            >
              {filteredActivities.length === ACTIVITIES.length
                ? "All activity"
                : filteredActivities.length === 0
                  ? "No activity"
                  : `${filteredActivities.length} activity`}
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <Stack gap="sm">
              <Group justify="space-between" align="center" wrap="nowrap">
                <Text span inline size="md" fw="bold">
                  Filter Activity
                </Text>
                <Button
                  variant="subtle"
                  color="primary"
                  size="compact-md"
                  component="a"
                  onClick={toggleSelectAllHandler}
                >
                  {filteredActivities.length === ACTIVITIES.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </Group>
              <ScrollArea.Autosize mah={250} offsetScrollbars>
                <Checkbox.Group
                  value={filteredActivities}
                  onChange={filteredActivitiesChangeHandler}
                >
                  <Stack gap={6}>
                    {ACTIVITIES.map((activity) => (
                      <Checkbox.Card
                        radius="md"
                        value={activity.value}
                        key={activity.value}
                        className={classes.checkboxCard}
                      >
                        <Group wrap="nowrap" align="flex-start">
                          <Checkbox.Indicator />
                          <div className={classes.checkboxCardLabel}>
                            <Text inline span>
                              {activity.label}
                            </Text>
                          </div>
                        </Group>
                      </Checkbox.Card>
                    ))}
                  </Stack>
                </Checkbox.Group>
              </ScrollArea.Autosize>
            </Stack>
          </Popover.Dropdown>
        </Popover>

        <Button variant="default" onClick={sortHandler}>
          {sort === "asc" ? (
            <IconSortAscending size={20} />
          ) : (
            <IconSortDescending size={20} />
          )}
        </Button>
      </Button.Group>
    </Group>
  );
};
