import { Anchor, Badge, Group, Image, Text } from "@mantine/core";
import JiraIcon from "../../assets/icons/cib_jira.svg";
import classes from "./contentHeader.module.css";
import { TJiraTagsColumns } from "./types";

// This always returns a component, so the space-between Group (in parent)
// won't make the buttons jump around.
export const JiraTagsColumns = ({ jiraLink, tags }: TJiraTagsColumns) => (
  <Group gap="md">
    {jiraLink ? (
      <Anchor href={jiraLink} className={classes.jiraLink} target="_blank">
        <Image alt="Jira" src={JiraIcon} h={20} w={20} />
        <Text ml={5}>Jira Link</Text>
      </Anchor>
    ) : null}

    <Group gap={5}>
      {(tags ?? []).map((tag) => (
        <Badge key={tag} color="#EBEEFB" size="sm">
          <Text size="sm" c="black" fw="bold" truncate="end">
            {tag}
          </Text>
        </Badge>
      ))}
    </Group>
  </Group>
);
