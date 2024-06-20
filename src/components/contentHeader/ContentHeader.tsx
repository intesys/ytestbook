import { Button, Progress, Title, Tooltip } from "@mantine/core";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import { Avatars } from "../avatars/Avatars";
import { EditableText } from "../shared/EditableText";
import { StatusIcon } from "../statusIcon/StatusIcon";
import classes from "./contentHeader.module.css";
import { JiraTagsColumns } from "./JiraTagsColumns";
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
        <div className={classes.headerLeft}>
          <StatusIcon status={status} />
          <Title order={3}>
            <EditableText value={title} onChange={handleQuickEdit} />
          </Title>
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
        </div>
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
