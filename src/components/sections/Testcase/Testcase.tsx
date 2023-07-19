import React, { useEffect } from "react";
import useStyles from "./styles";
import Layout from "../../layout/Layout/Layout";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import { statusIcon } from "../../../lib/misc";
import { FaJira } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { ActionIcon, Badge, Box, Flex, Grid, Group, Progress, Title } from "@mantine/core";

const App: React.FC = () => {
  const { classes, theme } = useStyles();

  const {
    state: {
      testcase: { data: testcaseData },
    },
  } = useYTestbookContext();

  const tags = testcaseData?.tag?.map((item) => <Badge>{item.title}</Badge>);

  return (
    <div className={classes.testcase_detail}>
      <Flex
        className={classes.testcase_detail__header}
        justify="flex-start"
        direction="column"
        align="flex-start"
        wrap="wrap"
        gap="md"
      >
        <Group className={classes.testcase_detail__header_second}>
          <Group>{tags}</Group>
        </Group>
        <Group className={classes.testcase_detail__header_first}>
          <Group>
            {statusIcon(testcaseData?.status || "")}
            <h2>{testcaseData?.title}</h2>
            <FaJira />
          </Group>
          <Group>
            <ActionIcon variant="light">
              <MdMoreVert size="1.25rem" />
            </ActionIcon>
          </Group>
        </Group>
        <Group className={classes.testcase_detail__header_second}>
          <Progress value={50} color={"green"} sx={{ flex: "1" }} />
        </Group>
      </Flex>
      <Grid>
        <Grid.Col span={10} className={classes.testcase_detail__body}>
          <div className={classes.testcase_detail__body_desc}>{testcaseData?.description}</div>
          <div className={classes.testcase_detail__body_req}>
            <Title order={6} mb={theme.spacing.xs}>
              Requirements
            </Title>
            {testcaseData?.requirements}
          </div>
        </Grid.Col>
      </Grid>
      <div className={classes.testcase_detail__test}>
        <h4>Test</h4>
      </div>
    </div>
  );
};

export default App;
