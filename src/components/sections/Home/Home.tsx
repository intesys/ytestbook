import { Center, Container } from "@mantine/core";
import React from "react";
import SvgIcon from "../../shared/SvgIcon/SvgIcon";
import { TestbookList } from "./ui/TestBookList/TestbookList";
import classes from "./home.module.scss";
import { TestBookActionPanels } from "./ui/TestBookActionsPannel/TestBookActionPanels";

export const Home: React.FC = () => {
  return (
    <div className={classes.homeLayout}>
      <div className={classes.homeFirst}>
        <Container size={'lg'} className={classes.homeContainer}>
          <Center className={classes.homeLogo}>
            <SvgIcon iconName="logo" />
          </Center>

          <TestBookActionPanels />
        </Container>
      </div>

      <div className={classes.homeSecond}>
        <TestbookList />
      </div>
    </div>
  );
};
