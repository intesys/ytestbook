import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import UserLogin from "../components/sections/UserLogin/UserLogin";
import Home from "../components/sections/Home/Home";
import App from "../components/sections/App/App";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/"
          element={
            <AuthRoutes>
              <Home />
            </AuthRoutes>
          }
        />
        <Route
          path="/app"
          element={
            <AuthRoutes tbRequred>
              <App />
            </AuthRoutes>
          }
        />
      </Route>
    </Routes>
  );
};
