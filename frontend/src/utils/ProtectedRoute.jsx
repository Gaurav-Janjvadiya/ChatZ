import { Navigate } from "react-router";
import useAuth from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const {
    user: { isLoggedIn },
  } = useAuth();
  console.log("USER", isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
