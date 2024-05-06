import { Button, ThemeIcon } from "@mantine/core";
import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { TestbookInfo } from "../../../types/testbook";
import classes from "./header.module.scss";

export const Header: React.FC<
  Pick<TestbookInfo, "name" | "client"> & {
    handleSettingsClick?: () => void;
  }
> = ({ name, client, handleSettingsClick }) => {
  return (
    <header className={classes.header}>
      <div className={classes.header_logo}>
        <Link to="/">
          <img src={Logo} height={55} width={55} alt="yTestbook" />
        </Link>
      </div>
      <div className={classes.header_title}>
        <h4>{name}</h4>
        <small>Client: {client}</small>
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
    </header>
  );
};
