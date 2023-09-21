import { Routes, Route } from "react-router-dom";
import { Home } from "./components/sections/Home/Home";
import { Testbook } from "./components/sections/Testbook/Testbook";

// Navigation from home screen to testbook
export const MainNavigation = () => (
  <Routes>
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/testbook/:slug" element={<Testbook />} />
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
