import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Catalogue from "./pages/Catalogue"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/AdminDashboard"
import Profile from "./pages/Profile"
import UserOrders from "./pages/UserOrders"
import Layout from "./components/Layout"
import ProductDetails from "./pages/ProductDetails"
import OrderSuccess from "./pages/OrderSuccess"


function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Catalogue />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/success" element={<OrderSuccess />} />

      </Route>

    </Routes>
  )
}

export default App