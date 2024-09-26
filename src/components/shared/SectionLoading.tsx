import { Flex, Loader } from "@mantine/core";

export const SectionLoading = () => {
  return (
    <Flex align="center" justify="center" h="100dvh" w={"100%"}>
      <Loader color="blue" size="lg" />
    </Flex>
  );
};
