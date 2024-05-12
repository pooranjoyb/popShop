import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../utils/features/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  function handleAuth()
  {
    navigate('/');
  }

 
  
  return isAuthenticated !== undefined ? (isAuthenticated ? children : <h1>You Don't Have Valid Access to go on login page Click on <button onClick={handleAuth} className="bg-red-400">Login page</button> .</h1>) : null; // Conditional rendering based on state availability
  

}
