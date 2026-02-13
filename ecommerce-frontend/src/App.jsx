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




function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Catalogue />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        }
      />

    </Routes>

  )
}

export default App







