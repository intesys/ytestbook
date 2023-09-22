import { Center, Container } from "@mantine/core";
import React from "react";
import SvgIcon from "../../misc/SvgIcon/SvgIcon";
import { CreateTestbook } from "./CreateTestbook";
import { TestbookList } from "./TestbookList";
import { useHomeStyles } from "./styles";

export const Home: React.FC = () => {
  const { classes } = useHomeStyles();

  return (
    <div className={classes.home_layout}>
      <div className={classes.home_first}>
        <Container size="xs" className={classes.home_container}>
          <Center className={classes.home_logo}>
            <SvgIcon iconName="logo" />
          </Center>
          <CreateTestbook />
        </Container>
      </div>

      <div className={classes.home_second}>
        <TestbookList />
      </div>
    </div>
  );
};
