import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Layout