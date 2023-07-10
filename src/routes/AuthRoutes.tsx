import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/hooks/auth";

interface IOwnProps {
  children: JSX.Element;
}

export const AuthRoutes = ({ children }: IOwnProps) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
