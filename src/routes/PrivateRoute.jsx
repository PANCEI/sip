import { Outlet, Navigate } from "react-router";
import { useLocalStorageEncrypt } from "../helper/CostumHook";

export default function PrivateRoute({ children }) {
  const [token] = useLocalStorageEncrypt("token", null);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
