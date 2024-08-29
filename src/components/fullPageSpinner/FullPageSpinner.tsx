import { Flex, Loader } from "@mantine/core";

export const FullPageSpinner = () => {
  return (
    <Flex align="center" justify="center" h="100dvh" w={"100%"}>
      <Loader color="blue" size="lg" />
    </Flex>
  );
};
