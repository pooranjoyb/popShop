import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import Error from "../Error";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
   
  return isAuthenticated !== undefined ? (isAuthenticated ? children : <Error/>) : null; // Conditional rendering based on state availability
  

}
