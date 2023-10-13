import { Routes, Route } from "react-router-dom";
import { Home } from "./components/sections/Home/Home";
import { Testbook } from "./components/sections/Testbook/Testbook";
import Layout from "./components/layout/Layout/Layout";

// Navigation from home screen to testbook
export const MainNavigation = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route element={<Layout />}>
      <Route path=":testbook" element={<Testbook />}>
        <Route path=":testcase" element={<Testbook />}>
          <Route path=":test" element={<Testbook />}>
            <Route path=":step" element={<Testbook />} />
          </Route>
        </Route>
      </Route>
    </Route>
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
