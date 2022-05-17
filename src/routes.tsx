import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layouts/Layout/Layout";
import Report from "./components/pages/Report/Report";
import Testbook from "./components/pages/Testbook/Testbook";
import UseCases from "./components/pages/UseCases/UseCases";
import Members from "./components/pages/Members/Members";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/plan/testbook">
          <Layout>
            <Testbook />
          </Layout>
        </Route>
        <Route path="/plan/usecases">
          <Layout>
            <UseCases />
          </Layout>
        </Route>
        <Route path="/plan/members">
          <Layout>
            <Members />
          </Layout>
        </Route>
        <Route path="/">
          <Layout>
            <Report />
          </Layout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
