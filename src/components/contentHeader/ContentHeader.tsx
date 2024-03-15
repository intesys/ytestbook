import classes from "./contentHeader.module.scss";
import StatusDone from "../../assets/icons/status_done.svg";
import { Anchor, Button, Text } from "@mantine/core";
import JiraIcon from "../../assets/icons/cib_jira.svg";
import Edit from "../../assets/icons/edit.svg";
import Delete from "../../assets/icons/delete.svg";
import { TContentHeader } from "./types";

export function ContentHeader({
  title,
  jiraLink,
  handleEditClick,
  handleDeleteClick,
}: TContentHeader) {
  return (
    <div className={classes.header}>
      <div className={classes.headerTop}>
        <img src={StatusDone} height={24} width={24} />
        <Text size="24px" fw={"700"}>
          {title}
        </Text>
      </div>
      <div className={classes.headerBottom}>
        <div>
          {jiraLink && (
            <Anchor
              href={jiraLink}
              className={classes.jiraLink}
              target="_blank"
            >
              <img src={JiraIcon} height={20} width={20} />
              <Text ml={5}>Jira Link</Text>
            </Anchor>
          )}
        </div>
        <div>
          <Button
            leftSection={<img src={Edit} height={24} width={24} />}
            variant="subtle"
            c={"black"}
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            leftSection={<img src={Delete} height={24} width={24} />}
            variant="subtle"
            c={"black"}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
