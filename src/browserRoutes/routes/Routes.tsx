import Auth from "../../pages/Auth/Auth";
import Error from "../../pages/Error";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home/Home";
import Shop from "../../pages/Shop/Shop";
import ProductDetail from "../../pages/Shop/ProductDetail";
import Cart from "../../pages/Cart/Cart";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../../pages/Auth/ProtectedRoute";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
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
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default Routes;
