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
    {/* <Route element={<Layout />}>
      <Route path=":testbook" element={<Testbook />}>
        <Route path=":testcase" element={<Testbook />}>
          <Route path=":test" element={<Testbook />}>
            <Route path=":step" element={<Testbook />} />
          </Route>
        </Route>
      </Route>
    </Route> */}
  </Routes>
);

// Subroutes, internal to testbook
export const TestbookNavigation = () => (
  <Routes>
    <Route>
      {/* <Route path="/" element={<Home />} />
      <Route path="/testbook" element={<Testbook />} /> */}
    </Route>
  </Routes>
);
