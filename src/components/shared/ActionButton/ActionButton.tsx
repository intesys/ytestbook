import {
  Button,
  ButtonProps,
  Group,
  PolymorphicComponentProps,
  Image,
  Box,
} from "@mantine/core";

import classes from "./actionButton.module.css";

type ActionButtonProps = PolymorphicComponentProps<"button", ButtonProps> & {
  icon: string;
};

export const ActionButton = ({
  children,
  icon,
  ...props
}: ActionButtonProps) => {
  return (
    <Button {...props} variant="outline" className={classes.actionButton}>
      <Group gap={20} justify="start" align="center">
        <Image src={icon} w={24} />
        <Box>{children}</Box>
      </Group>
    </Button>
  );
};
