import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppRoutes } from "../../utils/routes";

type PrivateRouterProps = {
  children?: JSX.Element;
  isAllowed: boolean;
  redirectPath?: string;
};

export default function PrivateRouter({
  children,
  isAllowed,
  redirectPath = AppRoutes.home,
}: PrivateRouterProps): JSX.Element {
  const location = useLocation();

  if (!isAllowed)
    return <Navigate to={redirectPath} state={{ from: location }} />;
  return children || <Outlet />;
}
