import { Navigate, useLocation } from "react-router-dom";
import { useYTestbookContext } from "../context/useYTestbookContext";
import { LOADING_STATUS } from "../reducer/types";

interface IOwnProps {
  route: string;
  children: JSX.Element;
}

export const RedirectRoutes = ({ route, children }: IOwnProps) => {
  const {
    state: {
      auth: { status: authStatus, data: authData },
    },
  } = useYTestbookContext();

  let location = useLocation();

  if (authStatus === LOADING_STATUS.SUCCESS && authData) {
    return <Navigate to={route} state={{ from: location }} replace />;
  }

  return children;
};
