import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { API_URL } from "../services/api"
import { useLocation } from "react-router-dom"

function Catalogue() {
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const location = useLocation()
    const searchQuery =
        new URLSearchParams(location.search).get("search") || ""

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${API_URL}/products`)
            const data = await res.json()
            setProducts(data)
        }

        fetchProducts()
    }, [])

    // Extract unique categories dynamically
    const categories = [
        ...new Set(products.map((p) => p.category).filter(Boolean)),
    ]

    // Combined Filtering (Search + Category)
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "" || product.category === selectedCategory)
    )

    const addToCart = async (productId) => {
        const token = localStorage.getItem("token")

        const res = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId,
                quantity: 1,
            }),
        })

        const data = await res.json()

        if (res.ok) {
            alert("Added to cart")
        } else {
            alert(data.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

                {/* Sidebar */}
                <aside className="w-64 bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Categories
                    </h3>

                    <ul className="space-y-3 text-gray-600">

                        <li
                            onClick={() => setSelectedCategory("")}
                            className={`cursor-pointer hover:text-gray-900 ${selectedCategory === "" ? "font-semibold text-black" : ""
                                }`}
                        >
                            All
                        </li>

                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectedCategory(cat)}
                                className={`cursor-pointer hover:text-gray-900 ${selectedCategory === cat ? "font-semibold text-black" : ""
                                    }`}
                            >
                                {cat}
                            </li>
                        ))}

                    </ul>
                </aside>

                {/* Products Grid */}
                <main className="flex-1 grid grid-cols-3 gap-6">

                    {filteredProducts.length === 0 ? (
                        <div className="col-span-3 text-center text-gray-600">
                            No products found
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition"
                            >
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-40 w-full object-cover rounded-md mb-4"
                                    />
                                ) : (
                                    <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                                )}

                                <h4 className="text-gray-800 font-medium mb-2">
                                    {product.name}
                                </h4>

                                <p className="text-gray-600 mb-3">
                                    ₹{product.price}
                                </p>

                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    )}

                </main>
            </div>
        </div>
    )
}

export default Catalogue
