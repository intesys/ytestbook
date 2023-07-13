import React, { useEffect } from "react";
import useStyles from "./styles";
import Layout from "../../layout/Layout/Layout";
import { useYTestbookContext } from "../../../context/useYTestbookContext";

const App: React.FC = () => {
  const { classes } = useStyles();

  return (
    <>
      <Layout>App</Layout>
    </>
  );
};

export default App;
