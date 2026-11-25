import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

// Route guard: renders children only for logged-in users.
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/welcome" replace />;
};

export default RequireAuth;
