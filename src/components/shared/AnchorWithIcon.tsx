import { Anchor, AnchorProps, Group, GroupProps } from "@mantine/core";
import { ReactNode } from "react";

type AnchorWithIconProps = AnchorProps & {
  icon: ReactNode;
  label: string;
  groupProps?: GroupProps;
};

export const AnchorWithIcon = ({
  icon,
  label,
  groupProps = {},
  ...rest
}: AnchorWithIconProps) => {
  return (
    <Anchor size="sm" c="white" fw={600} ml={10} {...rest}>
      <Group gap="xs" {...groupProps}>
        {icon}
        {label}
      </Group>
    </Anchor>
  );
};
