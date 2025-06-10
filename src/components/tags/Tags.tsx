import { Badge, Flex, Text } from "@mantine/core";

export function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return <Text>—</Text>;
  const firstTags = tags.slice(0, 2);
  return (
    <Flex gap={5}>
      {firstTags.map((tag) => (
        <Badge key={tag} color="#EBEEFB" size="sm">
          <Text size="sm" c={"black"} fw={"bold"} truncate="end">
            {tag}
          </Text>
        </Badge>
      ))}

      {tags.length > firstTags.length && (
        <Badge color="black" size="sm">
          +{tags.length - firstTags.length}
        </Badge>
      )}
    </Flex>
  );
}
