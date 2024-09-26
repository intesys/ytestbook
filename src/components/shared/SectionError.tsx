import { Alert, Flex } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export const SectionError = () => {
  return (
    <Flex align="center" justify="center" h="100dvh" w={"100%"}>
      <Alert
        variant="light"
        color="red"
        title="Attention"
        icon={<IconExclamationCircle />}
      >
        Error while loading the section
      </Alert>
    </Flex>
  );
};
