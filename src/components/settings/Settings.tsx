import {
  Button,
  Flex,
  Loader,
  TagsInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useProject } from "../../lib/operators/useProject";
import classes from "./settings.module.scss";
import { useEffect, useState } from "react";
import { TProject } from "../../schema";
import { notifications } from "@mantine/notifications";

export function Settings() {
  const params = useParams();
  const project = useProject(params.projectId);
  const [tags, setTags] = useState<TProject["allTags"]>([]);

  useEffect(() => {
    if (project.data) setTags(project.data.allTags);
  }, [project.data]);

  if (project.loading) {
    return (
      <Flex align="center" justify="center" h="100dvh" w={"100%"}>
        <Loader color="blue" size="lg" />
      </Flex>
    );
  } else {
    return (
      <div className={classes.settings}>
        <div className={classes.header}>
          <Title order={3}>Settings</Title>
        </div>

        <div className={classes.projectData}>
          <Title order={4}>Project data</Title>
        </div>

        <div className={classes.members}>
          <Title order={4}>Members</Title>
        </div>

        <div className={classes.tags}>
          <Title order={4}>Tags</Title>
          <TagsInput mt={16} data={[]} value={tags} onChange={setTags} />
          <Flex mt={16} justify={"end"} w={"100%"}>
            <Button
              w={105}
              onClick={() => {
                project.updateAllTags(tags);
                notifications.show({
                  withBorder: true,
                  title: "Success!",
                  message: "The tags were updated",
                });
              }}
            >
              Submit
            </Button>
          </Flex>
        </div>

        <div className={classes.delete}>
          <Title order={4}>Delete project</Title>
          <Button
            bg={"red"}
            leftSection={
              <ThemeIcon color="white" variant={"transparent"} size={24}>
                <RiDeleteBin6Line size={24} />
              </ThemeIcon>
            }
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
