import { Anchor, Group } from "@mantine/core";
import React, { ReactNode } from "react";

type AnchorWithIconProps = {
  onClick: () => void;
  icon: ReactNode;
  label: string;
};

export const AnchorWithIcon = ({
  onClick,
  icon,
  label,
}: AnchorWithIconProps) => {
  return (
    <Anchor onClick={onClick} size="sm" c="white" fw={600} ml={10}>
      <Group gap="xs">
        {icon}
        {label}
      </Group>
    </Anchor>
  );
};
