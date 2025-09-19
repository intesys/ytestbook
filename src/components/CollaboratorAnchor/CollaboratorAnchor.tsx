import { MouseEvent, ReactNode, useCallback } from "react";
import {
  Anchor,
  AnchorProps,
  Group,
  GroupProps,
  HoverCard,
  HoverCardDropdownProps,
  HoverCardProps,
  HoverCardTargetProps,
  Stack,
  Text,
  TextProps,
} from "@mantine/core";
import { CollaboratorAvatar } from "@/components/CollaboratorAvatar/CollaboratorAvatar.tsx";
import { InlineFlex } from "@/components/InlineFlex/InlineFlex.tsx";
import { USER_ANONYMOUS } from "@/lib/constants/generic.ts";
import { TCollaborator } from "@/types/schema.ts";

interface CollaboratorAnchorProps extends HoverCardProps {
  collaborator?: TCollaborator;
  secondaryInfo?: string | ReactNode;
  targetProps?: Partial<HoverCardTargetProps>;
  dropdownProps?: Partial<HoverCardDropdownProps>;
  anchorProps?: Partial<AnchorProps>;
  secondaryInfoProps?: Partial<TextProps>;
  hoverCardGroupProps?: Partial<GroupProps>;
  withHoverCard?: boolean;
  withInlineAvatar?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Displays a collaborator's name as an anchor.
 * It can optionally show an inline avatar and a hover card with more details about the collaborator.
 *
 * @param {TCollaborator} [collaborator] - The collaborator data to display. If not provided, defaults to an anonymous user.
 * @param {Partial<AnchorProps>} [anchorProps] - Props for the anchor element.
 *
 * @param {boolean} [withInlineAvatar=false] - Whether to show the avatar inline with the name.
 * @param {boolean} [withHoverCard=false] - Whether to show the hover card.
 *
 * @param {HoverCardProps} [hoverCardProps] - Additional props for the hover card.
 * @param {Partial<GroupProps>} [hoverCardGroupProps] - Props for the group inside the hover card.
 * @param {Partial<HoverCardTargetProps>} [targetProps] - Props for the hover card target.
 * @param {Partial<HoverCardDropdownProps>} [dropdownProps] - Props for the hover card dropdown.
 *
 * @param {string | ReactNode} [secondaryInfo] - Optional secondary information to show.
 * @param {Partial<TextProps>} [secondaryInfoProps] - Props for the secondary info text.
 *
 * @returns {JSX.Element} The rendered collaborator anchor component.
 */
export const CollaboratorAnchor = ({
  anchorProps = {},
  collaborator,
  dropdownProps = {},
  hoverCardGroupProps = {},
  secondaryInfo,
  secondaryInfoProps = {},
  targetProps = {},
  withHoverCard = false,
  withInlineAvatar = false,
  onClick,
  ...hoverCardProps
}: CollaboratorAnchorProps) => {
  let secondaryInfoElement = null;

  if (secondaryInfo) {
    if (typeof secondaryInfo === "string") {
      secondaryInfoElement = (
        <Text span inline c="dimmed" size="sm" {...secondaryInfoProps}>
          {secondaryInfo}
        </Text>
      );
    } else {
      secondaryInfoElement = secondaryInfo;
    }
  }

  const clickHandler = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  return (
    <HoverCard
      middlewares={{ inline: true }}
      withArrow
      position="top"
      radius="md"
      openDelay={200}
      closeDelay={400}
      disabled={withHoverCard === false}
      {...hoverCardProps}
    >
      <HoverCard.Target {...targetProps}>
        <Anchor onClick={clickHandler} {...anchorProps}>
          <InlineFlex>
            {withInlineAvatar ? (
              <CollaboratorAvatar
                collaborator={collaborator}
                size={25}
                withTooltip={false}
              />
            ) : null}
            {collaborator?.name ?? USER_ANONYMOUS.name}
          </InlineFlex>
        </Anchor>
      </HoverCard.Target>
      <HoverCard.Dropdown {...dropdownProps}>
        <Group gap="md" align="center" wrap="nowrap" {...hoverCardGroupProps}>
          <CollaboratorAvatar collaborator={collaborator} />

          <Stack gap={4}>
            <Text span inline fw="bold">
              {collaborator?.name ?? USER_ANONYMOUS.name}
            </Text>
            {secondaryInfoElement}
          </Stack>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
