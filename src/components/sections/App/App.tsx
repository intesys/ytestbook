import React from "react";
import useStyles from "./styles";
import Layout from "../../layout/Layout/Layout";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import Testcase from "../Testcase/Testcase";
import { LOADING_STATUS } from "../../../reducer/types";
import { Center, Loader } from "@mantine/core";

const App: React.FC = () => {
  const { classes } = useStyles();

  const {
    state: {
      testcase: { status: testacaseStatus },
    },
  } = useYTestbookContext();

  return (
    <>
      <Layout>
        {testacaseStatus === LOADING_STATUS.LOADING && (
          <Center>
            <Loader />
          </Center>
        )}
        {testacaseStatus === LOADING_STATUS.SUCCESS && <Testcase />}
      </Layout>
    </>
  );
};

export default App;
