import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Screens
import Home from "./screens/Home"
import Shop from "./screens/Shop";
import ProductDetail from "./screens/ProductDetail";
import Cart from "./screens/Cart";

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
