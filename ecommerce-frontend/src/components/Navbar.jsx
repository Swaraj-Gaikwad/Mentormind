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
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-gray-900 tracking-tight"
                >
                    ShopEase
                </Link>

                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center bg-gray-100 rounded-lg overflow-hidden"
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent px-4 py-2 w-64 outline-none text-sm"
                    />
                    <button className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black transition">
                        Search
                    </button>
                </form>

                {/* Right Section */}
                <div className="flex items-center gap-6 text-sm font-medium">

                    <Link
                        to="/cart"
                        className="text-gray-700 hover:text-black transition"
                    >
                        Cart
                    </Link>

                    {user?.role === "user" && (
                        <Link
                            to="/orders"
                            className="text-gray-700 hover:text-black transition"
                        >
                            My Orders
                        </Link>
                    )}

                    {user?.role === "admin" && (
                        <Link
                            to="/admin"
                            className="text-gray-700 hover:text-black transition"
                        >
                            Admin
                        </Link>
                    )}

                    <Link
                        to="/profile"
                        className="text-gray-700 hover:text-black transition"
                    >
                        Account
                    </Link>

                    <button
                        onClick={logout}
                        className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </header>
    )
}

export default Navbar


