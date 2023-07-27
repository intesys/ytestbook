import { Center, Loader } from "@mantine/core";
import React from "react";
import { useYTestbookContext } from "../../../context/useYTestbookContext";
import { LOADING_STATUS } from "../../../reducer/types";
import Layout from "../../layout/Layout/Layout";
import Testcase from "../Testcase/Testcase";
import useStyles from "./styles";

const App: React.FC = () => {
  const { classes } = useStyles();

  const {
    state: {
      testcase: { data: testcaseData, status: testacaseStatus },
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
