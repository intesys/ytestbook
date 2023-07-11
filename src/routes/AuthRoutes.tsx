import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

interface IOwnProps {
  children: JSX.Element;
}

export const AuthRoutes = ({ children }: IOwnProps) => {
  let auth = isAuthenticated();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
