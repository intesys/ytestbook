import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";

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
        <Route path="/login" element={<>Login</>} />
        <Route
          path="/app"
          element={
            <AuthRoutes>
              <>App</>
            </AuthRoutes>
          }
        />
      </Route>
    </Routes>
  );
};
