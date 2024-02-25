import { Navigate } from "react-router";
import { auth } from "../firebase";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
