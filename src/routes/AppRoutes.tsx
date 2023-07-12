import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { RedirectRoutes } from "./RedirectRoutes";
import UserLogin from "../components/sections/UserLogin/UserLogin";
import Home from "../components/sections/Home/Home";

export const AppRoutes = () => {
  let location = useLocation();

  return (
    <Routes>
      <Route>
        <Route
          path="/"
          element={
            <AuthRoutes>
              <Navigate to="/app" state={{ from: location }} replace />
            </AuthRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectRoutes route="/app">
              <UserLogin />
            </RedirectRoutes>
          }
        />
        <Route
          path="/app"
          element={
            <AuthRoutes>
              <Home />
            </AuthRoutes>
          }
        />
      </Route>
    </Routes>
  );
};
