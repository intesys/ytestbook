import { Route, Routes } from "react-router-dom";
import { _Home } from "./components/_home";
import { Project } from "./components/project/Project";
import { TestCase } from "./components/testCase/TestCase";
import { TestDetails } from "./components/testDetails/TestDetails";
import { CreateRepo } from "./components/createRepo/CreateRepo";

export const MainNavigation = () => (
  <Routes>
    <Route path="/" element={<_Home />} />
    <Route path="/create" element={<CreateRepo />} />
    <Route path="/project/:projectId" element={<Project />}>
      <Route path="testCase/:caseId" element={<TestCase />} />
      <Route path="testCase/:caseId/test/:testId" element={<TestDetails />} />
    </Route>
  </Routes>
);
