import { Route, Routes } from "react-router-dom";
import { _Home } from "./components/_home";
import { Project } from "./components/project/Project";
import { TestCase } from "./components/testCase/TestCase";

// Navigation from home screen to testbook
export const MainNavigation = () => (
  <Routes>
    <Route path="/" element={<_Home />} />
    <Route path="/project/:projectId" element={<Project />}>
      <Route path="testCase/:caseId" element={<TestCase />} />
    </Route>
  </Routes>
);
