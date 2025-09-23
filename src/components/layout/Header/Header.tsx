import React, { useState } from "react";
import classes from "./header.module.scss";
import { IconReport } from "@tabler/icons-react";
import clsx from "clsx";
import { IoCaretUp, IoSettingsSharp } from "react-icons/io5";
import { Link, useParams } from "react-router";
import { Box, Button, Collapse, Flex, ThemeIcon, Title } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import Logo from "@/assets/logo.svg";
import { EditableHtmlText } from "@/components/shared/EditableHtmlText";
import { isEditableHtmlTextPopupVisible } from "@/lib/helpers/isEditableHtmlTextPopupVisible";
import { useProject } from "@/lib/operators/useProject";
import { TProjectDynamicData } from "@/types/schema";

export const Header: React.FC<
  Pick<TProjectDynamicData, "title" | "customer"> & {
    handleSettingsClick?: () => void;
    handleReportsClick?: () => void;
  }
> = ({ customer, title, handleSettingsClick, handleReportsClick }) => {
  const params = useParams();
  const project = useProject(params.projectId);
  const [isDetailsOpened, detailsActions] = useDisclosure();

  const [descriptionTogglerRef, setDescriptionTogglerRef] =
    useState<HTMLDivElement | null>(null);
  const [descriptionCollapseRef, setDescriptionCollapseRef] =
    useState<HTMLDivElement | null>(null);

  const onExit = () => {
    if (isEditableHtmlTextPopupVisible()) {
      return;
    }

    detailsActions.close();
  };

  // Disable outside also on collapseToggler
  useClickOutside(onExit, null, [
    descriptionTogglerRef,
    descriptionCollapseRef,
  ]);

  const updateDescription = (description: string) =>
    project.updateProject({
      description,
    });

  const toggleDetails = () => {
    detailsActions.toggle();
  };

  return (
    <header className={`${classes.header} ${classes.headerBoxShadow}`}>
      <div className={classes.header_logo}>
        <Link to="/">
          <img src={Logo} height={55} width={55} alt="yTestbook" />
        </Link>
      </div>
      <div className={classes.header_title}>
        <Flex align="center" gap={10}>
          <Title order={4}>{title}</Title>
          <Box
            ref={setDescriptionTogglerRef}
            display="inline"
            onClick={toggleDetails}
            className={clsx(classes.descriptionToggler, {
              [classes.active]: isDetailsOpened,
            })}
          >
            <IoCaretUp />
          </Box>
        </Flex>
        <small>Client: {customer}</small>
      </div>

      {/* <Avatars collaborators={project.data?.collaborators ?? []} /> */}
      <div className={classes.action}>
        <Button
          p={0}
          variant="transparent"
          size="24px"
          onClick={handleReportsClick}
        >
          <ThemeIcon color="black" variant="transparent" size={24}>
            <IconReport />
          </ThemeIcon>
        </Button>
      </div>
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
        ref={setDescriptionCollapseRef}
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
