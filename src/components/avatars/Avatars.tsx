import { Avatar, AvatarProps, Box, Stack, Text, Tooltip } from "@mantine/core";
import { sha256 } from "js-sha256";
import { TCollaborator } from "../../schema";

type TAvatarsProps = {
  collaborators: TCollaborator[];
  maxAvatars?: number;
  avatarProps?: AvatarProps;
  withTooltip?: boolean;
};

const getGravatarURL = (email: string) => {
  const address = String(email).trim().toLowerCase();
  const hash = sha256(address);
  return `https://www.gravatar.com/avatar/${hash}?d=404`;
};

export function Avatars({
  collaborators,
  maxAvatars = 3,
  avatarProps = {},
  withTooltip = true,
}: TAvatarsProps) {
  if (collaborators.length === 0) {
    return <Text span> &mdash; </Text>;
  }

  const firstCollaborators = collaborators.slice(0, maxAvatars);
  const lastCollaborators = collaborators.slice(maxAvatars);

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group>
        {firstCollaborators.map((assignee) => (
          <Tooltip
            key={assignee.id}
            label={assignee.name}
            withArrow
            disabled={withTooltip === false}
          >
            <Avatar
              src={getGravatarURL(assignee.email)}
              alt={assignee.name}
              {...avatarProps}
            >
              {assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </Avatar>
          </Tooltip>
        ))}

        {collaborators.length > maxAvatars ? (
          <Tooltip
            label={
              <Stack gap={0}>
                {lastCollaborators.map((assignee) => (
                  <Box key={assignee.id}>{assignee.name}</Box>
                ))}
              </Stack>
            }
            withArrow
          >
            <Avatar bg="black" color="white" {...avatarProps}>
              +{collaborators.length - maxAvatars}
            </Avatar>
          </Tooltip>
        ) : null}
      </Avatar.Group>
    </Tooltip.Group>
  );
}
