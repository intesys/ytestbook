import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import AddCircle from "../../../assets/icons/add_circle.svg";
import Logo from "../../../assets/icons/logo.svg";
import { TestbookInfo } from "../../../types/testbook";
import classes from "./styles.module.scss";

const Header: React.FC<
  Pick<TestbookInfo, "name" | "client"> & { handleActionClick?: () => void }
> = ({ name, client, handleActionClick }) => {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div onClick={() => navigate("/")} className={classes.header_logo}>
        <img src={Logo} height={55} width={55} />
      </div>
      <div className={classes.divider}></div>
      <div className={classes.header_title}>
        <h4>{name}</h4>
        <small>{client}</small>
      </div>
      <div className={classes.action}>
        <Button
          onClick={handleActionClick}
          leftSection={<img src={AddCircle} width={24} height={24} />}
        >
          Create test case
        </Button>
      </div>
    </header>
  );
};

export default Header;
