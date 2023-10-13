import { Center, Container } from "@mantine/core";
import React from "react";
import SvgIcon from "../../shared/SvgIcon/SvgIcon";
import { CreateTestbook } from "./CreateTestbook";
import { TestbookList } from "./TestbookList";
import classes from "./home.module.scss";

export const Home: React.FC = () => {
  return (
    <div className={classes.homeLayout}>
      <div className={classes.homeFirst}>
        <Container size="xs" className={classes.homeContainer}>
          <Center className={classes.homeLogo}>
            <SvgIcon iconName="logo" />
          </Center>
          <CreateTestbook />
        </Container>
      </div>

      <div className={classes.homeSecond}>
        <TestbookList />
      </div>
    </div>
  );
};
