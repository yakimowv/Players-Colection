import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

function GuardesForNotLogin() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default GuardesForNotLogin;
