import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("jwt");
  return isLoggedIn ? children : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
