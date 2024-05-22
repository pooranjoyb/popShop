import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import { Navigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth?.isAuthenticated);
   
  return isAuthenticated !== undefined ? (isAuthenticated ? children : <Navigate to="/" />): null; // Conditional rendering based on state availability
  
  }
