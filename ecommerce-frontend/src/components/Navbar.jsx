import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        setUser(storedUser)
    }, [])

    const logout = () => {
        localStorage.clear()
        navigate("/login")
        window.location.reload()
    }

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/?search=${search}`)
    }

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link to="/" className="text-xl font-semibold text-gray-800">
                    ShopEase
                </Link>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 py-1 rounded-md"
                    />
                    <button className="bg-gray-800 text-white px-3 py-1 rounded-md">
                        Search
                    </button>
                </form>

                <div className="flex items-center gap-6">

                    <Link to="/cart" className="text-gray-700">
                        Cart
                    </Link>

                    {user?.role === "user" && (
                        <Link to="/orders" className="text-gray-700">
                            My Orders
                        </Link>
                    )}

                    {user?.role === "admin" && (
                        <Link to="/admin" className="text-gray-700">
                            Admin Dashboard
                        </Link>
                    )}

                    <Link to="/profile" className="text-gray-700">
                        Profile
                    </Link>

                    <button
                        onClick={logout}
                        className="text-red-600"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </header>
    )
}

export default Navbar


