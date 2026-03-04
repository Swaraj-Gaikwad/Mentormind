import { useEffect, useState } from "react"
import { API_URL } from "../services/api"
import { useLocation } from "react-router-dom"
import Hero from "../components/Hero"

function Catalogue() {
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    const location = useLocation()
    const searchQuery =
        new URLSearchParams(location.search).get("search") || ""

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${API_URL}/products`)
            const data = await res.json()
            setProducts(data)
        }

        fetchProducts()
    }, [])

    const categories = [
        ...new Set(products.map((p) => p.category).filter(Boolean)),
    ]

    const filteredProducts = products.filter(
        (product) =>
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

        if (res.ok) {
            alert("Added to cart")
        }
    }

    return (
        <div className="space-y-10">

            
            <Hero />

            
            <div className="flex gap-10">

                
                <aside className="w-64 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
                    <h3 className="text-lg font-semibold mb-6 text-gray-900">
                        Categories
                    </h3>

                    <ul className="space-y-4 text-gray-600">
                        <li
                            onClick={() => setSelectedCategory("")}
                            className={`cursor-pointer transition hover:text-black ${selectedCategory === "" ? "font-semibold text-black" : ""
                                }`}
                        >
                            All
                        </li>

                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectedCategory(cat)}
                                className={`cursor-pointer transition hover:text-black ${selectedCategory === cat ? "font-semibold text-black" : ""
                                    }`}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                </aside>

                
                <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredProducts.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 bg-white p-10 rounded-xl border shadow-sm">
                            No products found
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                            >
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-56 w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-56 bg-gray-200"></div>
                                )}

                                <div className="p-5">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                                        {product.name}
                                    </h4>

                                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xl font-bold text-gray-900">
                                            ₹{product.price}
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            Stock: {product.stock}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => addToCart(product._id)}
                                        className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                </main>
            </div>

        </div>
    )
}

export default Catalogue
