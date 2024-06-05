import Auth from "../../pages/Auth/Auth";
import Error from "../../pages/Error";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home/Home";
import Contact from "../../pages/Contact/Contact";
import Shop from "../../pages/Shop/Shop";
import ProductDetail from "../../pages/Shop/ProductDetail";
import Cart from "../../pages/Cart/Cart";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../../pages/Auth/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import Profile from "../../pages/Profile/Profile";
import TopButton from "../../components/TopButton/TopButton";
import TermsandConditions from "../../pages/T&C/TermsCond";

const Routes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state?.auth?.isAuthenticated
  );

  return createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout />
          <TopButton />
        </>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Auth />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
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
