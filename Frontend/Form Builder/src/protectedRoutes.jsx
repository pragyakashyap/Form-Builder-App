import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login page if no token exists
    return <Navigate to="/login" replace />;
  }

  // Allow access if the token exists
  return children;
};

export default ProtectedRoute;
