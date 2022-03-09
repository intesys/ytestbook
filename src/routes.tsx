import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/layouts/Layout/Layout";
import Report from "./components/pages/Report/Report";
import UseCases from "./components/pages/UseCases/UseCases";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/plan/usecases">
          <Layout>
            <UseCases />
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
