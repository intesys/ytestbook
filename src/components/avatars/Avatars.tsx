import { Tooltip, Avatar, Text } from "@mantine/core";
import { TCollaborator } from "../../schema";

export function Avatars({ assignees }: { assignees: TCollaborator[] }) {
  if (assignees.length === 0) return <Text>—</Text>;
  const firstAssignees = assignees.slice(0, 3);
  const lastAssignees = assignees.slice(3);
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group>
        {firstAssignees.map((assignee) => (
          <Tooltip label={assignee.name} withArrow>
            <Avatar>
              {assignee.name.split(" ")[0]?.[0]}
              {assignee.name.split(" ")[1]?.[0]}
            </Avatar>
          </Tooltip>
        ))}

        {assignees.length > firstAssignees.length && (
          <Tooltip
            label={
              <>
                {lastAssignees.map((assignee) => (
                  <div>{assignee.name}</div>
                ))}
              </>
            }
            withArrow
          >
            <Avatar bg={"black"} color="white">
              +{assignees.length - firstAssignees.length}
            </Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Tooltip.Group>
  );
}
