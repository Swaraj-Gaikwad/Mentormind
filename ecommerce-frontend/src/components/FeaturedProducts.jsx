import { useEffect, useState } from "react"
import { API_URL } from "../services/api"
import { useNavigate } from "react-router-dom"

function FeaturedProducts() {

    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${API_URL}/products`)
            const data = await res.json()


            setProducts(data.slice(0, 4))
        }

        fetchProducts()
    }, [])

    return (
        <section>

            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {products.map(product => (

                    <div
                        key={product._id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                    >

                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-48 w-full object-cover"
                            />
                        ) : (
                            <div className="h-48 bg-gray-200"></div>
                        )}

                        <div className="p-4">

                            <h3 className="font-medium text-gray-900 mb-1">
                                {product.name}
                            </h3>

                            <p className="text-gray-500 text-sm mb-3">
                                ₹{product.price}
                            </p>

                            <button
                                onClick={() => navigate(`/product/${product._id}`)}
                                className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition"
                            >
                                View Product
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    )
}

export default FeaturedProducts