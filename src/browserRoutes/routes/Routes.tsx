import Auth from "../../pages/Auth/Auth";
import Error from "../../pages/Error";
import Layout from "../../pages/Layout";
import Home from "../../pages/Home/Home";
import Shop from "../../pages/Shop/Shop";
import ProductDetail from "../../pages/Shop/ProductDetail";
import Cart from "../../pages/Cart/Cart";

import { createBrowserRouter } from "react-router-dom";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <Error />,
  },
  {
    path: "/home",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        errorElement: <Error />,
        children: [
          {
            path: "shop",
            element: <Shop />,
          },
        ],
      },
      {
        errorElement: <Error />,
        children: [
          {
            path: "product",
            element: <ProductDetail />,
          },
        ],
      },
      {
        errorElement: <Error />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);
