import { Button, Group, Progress, Tooltip } from "@mantine/core";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import { Avatars } from "../avatars/Avatars";
import { EditableTitle } from "../shared/EditableText";
import { StatusIcon } from "../statusIcon/StatusIcon";
import { JiraTagsColumns } from "./JiraTagsColumns";
import classes from "./contentHeader.module.css";
import { TContentHeader } from "./types";

export function ContentHeader({
  status,
  title,
  jiraLink,
  tags,
  assignees,
  completion,
  handleQuickEdit,
  handleEditClick,
  handleDeleteClick,
}: TContentHeader) {
  return (
    <div className={classes.header}>
      <div className={classes.headerTop}>
        <Group className={classes.headerLeft} gap={10} align="center" flex={1}>
          <StatusIcon status={status} />
          <EditableTitle value={title} onChange={handleQuickEdit} />
          {completion !== undefined ? (
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
          ) : null}
        </Group>
        {assignees && <Avatars collaborators={assignees} />}
      </div>
      <div className={classes.headerBottom}>
        <JiraTagsColumns jiraLink={jiraLink} tags={tags} />
        <div>
          {handleEditClick ? (
            <Button
              leftSection={<img src={Edit} height={24} width={24} />}
              variant="subtle"
              c={"black"}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          ) : null}
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
