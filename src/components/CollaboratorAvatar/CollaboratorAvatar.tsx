import { Avatar, AvatarProps } from "@mantine/core";
import { Avatars } from "@/components/avatars/Avatars.tsx";
import { USER_ANONYMOUS } from "@/lib/constants/generic.ts";
import { TCollaborator } from "@/types/schema.ts";

interface CollaboratorAvatarProps extends AvatarProps {
  collaborator?: TCollaborator;
  withTooltip?: boolean;
}

/**
 * Renders an avatar for a collaborator.
 * If a collaborator is provided, shows their avatar with optional tooltip.
 * Otherwise, displays a default anonymous user avatar.
 *
 * @param collaborator - The collaborator data.
 * @param withTooltip - Whether to show a tooltip on the avatar.
 * @param avatarProps - Additional props for the Avatar component.
 */
export const CollaboratorAvatar = ({
  collaborator,
  withTooltip = true,
  ...avatarProps
}: CollaboratorAvatarProps) => {
  if (collaborator) {
    return (
      <Avatars
        collaborators={[collaborator]}
        maxAvatars={1}
        avatarProps={avatarProps}
        withTooltip={withTooltip}
      />
    );
  }

  return (
    <Avatar alt={USER_ANONYMOUS.name} {...avatarProps}>
      {USER_ANONYMOUS.name.substring(0, 1)}
    </Avatar>
  );
};
