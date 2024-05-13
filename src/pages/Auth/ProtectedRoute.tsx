import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import { useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
   
  return isAuthenticated !== undefined ? (isAuthenticated ? children : <button onClick={()=>{navigate('/')}}>Go to Login Page</button>) : null; // Conditional rendering based on state availability
  

}
