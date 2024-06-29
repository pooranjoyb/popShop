import Auth from "../../pages/Auth/Auth";
import Oauth from "../../pages/Auth/Oauth";
import Error from "../../pages/Error";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home/Home";
import Contact from "../../pages/Contact/Contact";
import Shop from "../../pages/Shop/Shop";
import ProductDetail from "../../pages/Shop/ProductDetail";
import Cart from "../../pages/Cart/Cart";
import Checkout from "../../pages/Checkout/Checkout";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../../pages/Auth/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import Profile from "../../pages/Profile/Profile";
import TopButton from "../../components/TopButton/TopButton";
import TermsandConditions from "../../pages/T&C/TermsCond";
import MyOrders from "../../pages/Orders/MyOrders";

const Routes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state?.auth?.isAuthenticated
  );

  return createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/home" /> : <Auth />,
      errorElement: <Error />,
    },
    {
      path: "/oauth",
      element: <Oauth />,
      errorElement: <Error />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Layout />
          <TopButton />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "shop",
          children: [
            {
              index: true,
              element: <Shop />,
            },
            {
              path: "product",
              element: <ProductDetail />,
            },
            {
              path: "cart",
              element: <Cart />,
            },
            {
              path:"checkout",
              element:<Checkout/>
            }
          ],
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "terms-and-conditions",
          element: <TermsandConditions />,
        },
        {
          path: 'my-orders',
          element: <MyOrders />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
};

export default Routes;
