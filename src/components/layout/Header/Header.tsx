import { Box, Button, Collapse, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { IoSettingsSharp, IoCaretDown, IoCaretUp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { TProjectDynamicData } from "../../../schema";
import classes from "./header.module.scss";
import { EditableHtmlText } from "../../shared/EditableHtmlText";
import { useProject } from "../../../lib/operators/useProject";
import { useClickOutside, useDisclosure } from "@mantine/hooks";

export const Header: React.FC<
  Pick<TProjectDynamicData, "title" | "customer"> & {
    handleSettingsClick?: () => void;
  }
> = ({ customer, title, handleSettingsClick }) => {
  const params = useParams();
  const project = useProject(params.projectId);
  const [isDetailsOpened, detailsActions] = useDisclosure();

  const onExit = () => detailsActions.close();

  const ref = useClickOutside(onExit);

  const updateDescription = (description: string) =>
    project.updateProject({
      description,
    });

  const toggleDetails = () => detailsActions.toggle();

  return (
    <header className={`${classes.header} ${classes.headerBoxShadow}`}>
      <div className={classes.header_logo}>
        <Link to="/">
          <img src={Logo} height={55} width={55} alt="yTestbook" />
        </Link>
      </div>
      <div className={classes.header_title}>
        <Flex align="center" gap={10}>
          <h4>{title}</h4>
          <Box display="inline" onClick={toggleDetails}>
            {isDetailsOpened ? <IoCaretDown /> : <IoCaretUp />}
          </Box>
        </Flex>
        <small>Client: {customer}</small>
      </div>
      {/* <Avatars assignees={project.data?.collaborators || []} /> */}
      <div className={classes.action}>
        <Button
          p={0}
          variant="transparent"
          size="24px"
          onClick={handleSettingsClick}
        >
          <ThemeIcon color="black" variant="transparent" size={24}>
            <IoSettingsSharp />
          </ThemeIcon>
        </Button>
      </div>
      <Box
        pos="absolute"
        top={68}
        bg={"white"}
        w={"100%"}
        left={0}
        className={classes.headerBoxShadow}
        ref={ref}
      >
        <Collapse in={isDetailsOpened}>
          <Box p={20} ml={71}>
            <EditableHtmlText
              name="Description"
              value={project.data?.description}
              onChange={updateDescription}
            />
          </Box>
        </Collapse>
      </Box>
    </header>
  );
};
