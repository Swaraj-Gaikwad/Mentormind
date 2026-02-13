import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Catalogue from "./pages/Catalogue"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"



function App() {
  return (
    <Routes>
      <Route path="/" element={<Catalogue />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default App







