import { Routes, Route } from "react-router-dom";
import Home from "../components/sections/Home/Home";
import App from "../components/sections/App/App";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
      </Route>
    </Routes>
  );
};
