import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { CreateRepo } from "./components/createRepo/CreateRepo";
import { Empty } from "./components/empty/Empty";
import { Home } from "./components/home";
import { Project } from "./components/project/Project";
import { Settings } from "./components/settings/Settings";
import { TestCase } from "./components/testCase/TestCase";
import { TestDetails } from "./components/testDetails/TestDetails";

export const MainNavigation: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create" element={<CreateRepo />} />
    <Route path="/project/:projectId" element={<Project />}>
      <Route path="settings" element={<Settings />} />
      <Route path="empty" element={<Empty />} />
      <Route path="testCase/:caseId" element={<Outlet />}>
        <Route index element={<TestCase />} />
        <Route path="test/:testId" element={<TestDetails />} />
      </Route>
    </Route>
  </Routes>
);
