import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";
import { useYTestbookContext } from "../context/useYTestbookContext";
import { ROUTES_NAME } from "./routes";

interface IOwnProps {
  tbRequred?: boolean;
  children: JSX.Element;
}

export const AuthRoutes = ({ tbRequred, children }: IOwnProps) => {
  const {
    state: {
      testbook: { data: testbookData },
    },
  } = useYTestbookContext();

  let auth = isAuthenticated();
  let location = useLocation();

  if (!auth) {
    return <Navigate to={ROUTES_NAME.LOGIN} state={{ from: location }} replace />;
  }

  if (tbRequred && !testbookData?.id) {
    return <Navigate to={ROUTES_NAME.HOME} state={{ from: location }} replace />;
  }

  return children;
};
