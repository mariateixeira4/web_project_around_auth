import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isCheckingAuth, children }) {
  if (isCheckingAuth) {
    return null;
  }

  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
