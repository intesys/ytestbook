import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import Dashboard from "../sections/Dashboard/Dashboard";
import Login from "../sections/UserLogin/UserLogin";
import { RedirectRoutes } from "./RedirectRoutes";

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
              <Login />
            </RedirectRoutes>
          }
        />
        <Route
          path="/app"
          element={
            <AuthRoutes>
              <Dashboard />
            </AuthRoutes>
          }
        />
      </Route>
    </Routes>
  );
};
