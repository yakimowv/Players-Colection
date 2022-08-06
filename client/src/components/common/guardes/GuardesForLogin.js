import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

function GuardesForLogin() {
  const { isAuthenticated } = useAuthContext();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default GuardesForLogin;
