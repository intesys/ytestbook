import { Avatar, AvatarProps } from "@mantine/core";
import { sha256 } from "js-sha256";
import { TCollaborator } from "../../schema.ts";

export type TCollaboratorAvatar = AvatarProps & {
  collaborator: TCollaborator;
};

const getGravatarURL = (email: string) => {
  const address = String(email).trim().toLowerCase();
  const hash = sha256(address);
  return `https://www.gravatar.com/avatar/${hash}?d=404`;
};

export const CollaboratorAvatar = ({
  collaborator,
  ...rest
}: TCollaboratorAvatar) => {
  return (
    <Avatar
      src={getGravatarURL(collaborator.email)}
      alt={collaborator.name}
      {...rest}
    >
      {collaborator.name.substring(0, 2).toUpperCase()}
    </Avatar>
  );
};
