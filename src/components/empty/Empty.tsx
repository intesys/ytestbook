import { Flex, Text } from "@mantine/core";

export function Empty() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{ flex: 1 }}
      h={"100%"}
      w="100%"
    >
      <Text c={"gray"} ta={"center"}>
        You have no test cases yet.
        <br />
        Create a new one to get started.
      </Text>
    </Flex>
  );
}
