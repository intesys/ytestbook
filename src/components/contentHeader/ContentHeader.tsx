import { Anchor, Button, Progress, Text, Title, Tooltip } from "@mantine/core";
import JiraIcon from "../../assets/icons/cib_jira.svg";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { StatusMenu } from "../statusMenu/StatusMenu";
import classes from "./contentHeader.module.scss";
import { TContentHeader } from "./types";

export function ContentHeader({
  id,
  status,
  title,
  jiraLink,
  completion,
  handleUpdateStatus,
  handleEditClick,
  handleDeleteClick,
}: TContentHeader) {
  return (
    <div className={classes.header}>
      <div className={classes.headerTop}>
        <StatusMenu
          id={id}
          target={
            <Button p={0} variant="transparent">
              <StatusIcon status={status} />
            </Button>
          }
          updateStatus={handleUpdateStatus}
        />
        <Title order={3}>{title}</Title>
        <Tooltip label={`${completion}%`}>
          <Progress
            w={200}
            ml={22}
            value={completion}
            size="lg"
            radius="lg"
            color={"#0DE1A5"}
          />
        </Tooltip>
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
