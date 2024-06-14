import { TJiraTagsColumns } from "./types";
import classes from "./contentHeader.module.css";
import JiraIcon from "../../assets/icons/cib_jira.svg";
import { Anchor, Badge, Flex, Text } from "@mantine/core";

export function JiraTagsColumns({ jiraLink, tags }: TJiraTagsColumns) {
  if (!jiraLink && !tags) {
    return null;
  }

  return (
    <div>
      {jiraLink && (
        <Anchor href={jiraLink} className={classes.jiraLink} target="_blank">
          <img src={JiraIcon} height={20} width={20} />
          <Text ml={5}>Jira Link</Text>
        </Anchor>
      )}
      {tags && (
        <Flex gap={5}>
          {tags.map((tag) => (
            <Badge key={tag} color="#EBEEFB" size="sm">
              <Text size="sm" c={"black"} fw={"bold"} truncate="end">
                {tag}
              </Text>
            </Badge>
          ))}
        </Flex>
      )}
    </div>
  );
}
