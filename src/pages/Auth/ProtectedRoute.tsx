import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth?.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Conditional rendering based on state availability
  if (isAuthenticated === undefined) {
    return null; 
  }

  return isAuthenticated ? <>{children}</> : null;
}
