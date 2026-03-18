import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;