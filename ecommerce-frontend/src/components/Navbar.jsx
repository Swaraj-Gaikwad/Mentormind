import { Link } from "react-router-dom"

function Navbar() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-xl font-semibold text-gray-800">
                    ShopEase
                </Link>

                {/* Search */}
                <div className="flex-1 mx-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>

                {/* Cart Link */}
                <Link
                    to="/cart"
                    className="text-gray-700 hover:text-gray-900 font-medium"
                >
                    Cart
                </Link>
            </div>
        </header>
    )
}

export default Navbar
