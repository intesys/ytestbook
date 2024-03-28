import { Button, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/icons/logo.svg";
import { TestbookInfo } from "../../../types/testbook";
import classes from "./header.module.scss";

const Header: React.FC<
  Pick<TestbookInfo, "name" | "client"> & {
    handleSettingsClick?: () => void;
  }
> = ({ name, client, handleSettingsClick }) => {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div onClick={() => navigate("/")} className={classes.header_logo}>
        <img src={Logo} height={55} width={55} />
      </div>
      <div className={classes.divider}></div>
      <div className={classes.header_title}>
        <Title order={4}>{name}</Title>
        <Title order={5}>{client}</Title>
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
    </header>
  );
};

export default Header;
