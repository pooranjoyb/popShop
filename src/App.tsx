import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Screens
import Home from "./pages/Home"
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
