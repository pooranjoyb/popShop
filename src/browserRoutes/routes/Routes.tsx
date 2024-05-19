import Auth from "../../pages/Auth/Auth";
import Error from "../../pages/Error";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home/Home";
import Shop from "../../pages/Shop/Shop";
import ProductDetail from "../../pages/Shop/ProductDetail";
import Cart from "../../pages/Cart/Cart";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../../pages/Auth/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";

  const Routes = ()=>{
    const isAuthenticated = useSelector((state:RootState)=> state?.auth?.isAuthenticated);
    
    return createBrowserRouter([
  {
    path: '/',
    element: isAuthenticated ? <Navigate to = '/home'/> : <Auth />,
    errorElement: <Error />,
  },
  {
    path: '/home',
    element: (<ProtectedRoute><Layout /></ProtectedRoute>), 
    children: [
      {
        index : true, 
        element: <Home />,
      },
      {
        path: 'shop',
        children:[
          {
            index :true,
            element: <Shop />,
          },
          {
            path: 'product',
            element: <ProductDetail />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
          
        ]
      },
    ],
    errorElement:<Error/>
  },
  {
    path: '*',
    element: <Error />, 
  },
])};

export default Routes;